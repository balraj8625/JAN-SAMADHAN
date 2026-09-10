import app from '../src/app.js';
import http from 'http';

let server: http.Server;
const PORT = 5055;
const BASE_URL = `http://localhost:${PORT}/api`;

async function request(endpoint: string, options: any = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, options);
  const text = await res.text();
  let json: any = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }
  return { status: res.status, ok: res.ok, headers: res.headers, body: json, raw: text };
}

async function runTests() {
  console.log('--- STARTING REAL E2E INTEGRATION SUITE ---');
  server = app.listen(PORT);
  await new Promise((r) => setTimeout(r, 500));

  const timestamp = Date.now();
  const testMobile = `9${Math.floor(100000000 + Math.random() * 900000000)}`;
  const testPassword = 'Password123!';
  const testName = `Citizen Test ${timestamp}`;

  console.log(`\n1. [AUTH] Registering test citizen (Mobile: ${testMobile})...`);
  const regRes = await request('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: testName,
      mobile: testMobile,
      password: testPassword,
      email: `citizen_${timestamp}@example.com`,
      preferredLanguage: 'hi',
    }),
  });
  console.log(`   Register status: ${regRes.status}`, regRes.body?.success ? '✓ SUCCESS' : '✗ FAILED', regRes.body?.message || '');
  if (!regRes.body?.success) throw new Error('Registration failed');

  console.log('\n2. [AUTH] Logging in with password to obtain JWT...');
  const loginRes = await request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mobile: testMobile,
      password: testPassword,
    }),
  });
  console.log(`   Login status: ${loginRes.status}`, loginRes.body?.success ? '✓ SUCCESS' : '✗ FAILED');
  const token = loginRes.body?.data?.token;
  if (!token) throw new Error('Failed to obtain auth token');
  console.log(`   Issued JWT Token: ${token.substring(0, 20)}...`);

  const authHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  console.log('\n3. [AUTH] Validating session via GET /api/auth/me...');
  const meRes = await request('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
  console.log(`   /auth/me status: ${meRes.status}, User ID: ${meRes.body?.data?.id}, PreferredLang: ${meRes.body?.data?.preferredLanguage}`);
  if (!meRes.body?.success || meRes.body?.data?.mobile !== testMobile) throw new Error('/auth/me failed');

  console.log('\n4. [DEPARTMENTS] Fetching canonical department list...');
  const deptRes = await request('/departments');
  console.log(`   /departments status: ${deptRes.status}, Total: ${deptRes.body?.data?.length}`);
  const depts = deptRes.body?.data || [];
  const waterDept = depts.find((d: any) => d.id === 'water_supply_dept');
  if (!waterDept) throw new Error('water_supply_dept not found');
  console.log(`   Found canonical department: ${waterDept.id} -> ${waterDept.name.en} / ${waterDept.name.hi}`);

  console.log('\n5. [AI] Testing POST /api/ai/analyze for smart routing...');
  const aiRes = await request('/ai/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: 'Drinking water pipeline burst and contaminated water supplying in sector 4',
    }),
  });
  console.log(`   /ai/analyze status: ${aiRes.status}, Category: ${aiRes.body?.data?.category}, Dept: ${aiRes.body?.data?.department}`);
  if (!aiRes.body?.success) throw new Error('AI analyze failed');

  console.log('\n6. [GRIEVANCE] Creating real grievance in PostgreSQL...');
  const createGrievanceRes = await request('/grievances', {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      title: 'Water supply interruption in Sector 4 Shivaji Nagar',
      description: 'The main pipeline supplying drinking water has broken and dirty muddy water is flowing for the last 3 days.',
      departmentId: 'water_supply_dept',
      category: 'Water Supply Interruption / Pipeline Defect',
      state: 'Maharashtra',
      district: 'Pune',
    }),
  });
  console.log(`   Create status: ${createGrievanceRes.status}`, createGrievanceRes.body?.success ? '✓ SUCCESS' : '✗ FAILED');
  const grievance = createGrievanceRes.body?.data;
  if (!grievance) throw new Error('Failed to create grievance');
  console.log(`   Created Grievance ID: ${grievance.id}, Number: ${grievance.grievanceNumber}, Status: ${grievance.status}, DueAt: ${grievance.dueAt}`);

  console.log('\n7. [ATTACHMENT] Uploading file to grievance...');
  const blob = new Blob(['Evidence document: Ground inspection photo confirmation.'], { type: 'image/png' });
  const form = new FormData();
  form.append('file', blob, 'evidence.png');

  const uploadRes = await fetch(`${BASE_URL}/grievances/${grievance.id}/attachments`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });
  const uploadJson: any = await uploadRes.json();
  console.log(`   Upload status: ${uploadRes.status}`, uploadJson.success ? '✓ SUCCESS' : '✗ FAILED', uploadJson.data?.fileName || uploadJson.message);
  if (!uploadJson.success) throw new Error('Attachment upload failed');

  console.log('\n8. [GRIEVANCE] Fetching user grievances via GET /api/grievances...');
  const myGrievancesRes = await request('/grievances', {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(`   My Grievances count: ${myGrievancesRes.body?.data?.length}`);
  const foundGrievance = myGrievancesRes.body?.data?.find((g: any) => g.id === grievance.id);
  if (!foundGrievance) throw new Error('Created grievance not found in user list');
  console.log(`   Attachments count on grievance: ${foundGrievance.attachments?.length}`);

  console.log(`\n9. [TRACKING] Fetching grievance by reference number (${grievance.grievanceNumber})...`);
  const trackNumRes = await request(`/grievances/number/${grievance.grievanceNumber}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(`   Track by number status: ${trackNumRes.status}`, trackNumRes.body?.success ? '✓ SUCCESS' : '✗ FAILED');
  if (!trackNumRes.body?.success) throw new Error('Track by grievance number failed');
  console.log(`   Timeline events count: ${trackNumRes.body?.data?.timeline?.length}`);

  console.log(`\n10. [SLA] Checking escalation status for grievance...`);
  const escRes = await request(`/grievances/${grievance.id}/escalation-check`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(`   Escalation check status: ${escRes.status}, RecommendEscalation: ${escRes.body?.data?.recommendEscalation}`);

  console.log(`\n11. [FEEDBACK / APPEAL RULES] Testing validation guards before resolution...`);
  const prematureFeedbackRes = await request(`/grievances/${grievance.id}/feedback`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({ rating: 5, comment: 'Premature feedback test' }),
  });
  console.log(`   Premature feedback rejected with HTTP ${prematureFeedbackRes.status} (${prematureFeedbackRes.body?.message}) -> ✓ CORRECT`);
  if (prematureFeedbackRes.status !== 400) throw new Error('Premature feedback was not rejected');

  const prematureAppealRes = await request(`/grievances/${grievance.id}/appeal`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({ reason: 'Premature appeal reason here', description: 'Premature appeal description test longer than 20 chars' }),
  });
  console.log(`   Premature appeal rejected with HTTP ${prematureAppealRes.status} (${prematureAppealRes.body?.message}) -> ✓ CORRECT`);
  if (prematureAppealRes.status !== 400) throw new Error('Premature appeal was not rejected');

  console.log('\n========================================');
  console.log('🎉 ALL END-TO-END INTEGRATION TESTS PASSED 100%!');
  console.log('========================================');

  server.close();
  process.exit(0);
}

runTests().catch((err) => {
  console.error('❌ E2E Integration Test Failed:', err);
  if (server) server.close();
  process.exit(1);
});
