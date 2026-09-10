import app from '../src/app.js';
import http from 'http';
import prisma from '../src/config/database.js';

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
  console.log('--- STARTING COMPREHENSIVE POSITIVE & NEGATIVE E2E SECURITY SUITE ---');
  server = app.listen(PORT);
  await new Promise((r) => setTimeout(r, 500));

  const timestamp = Date.now();
  const user1Mobile = `9${Math.floor(100000000 + Math.random() * 900000000)}`;
  const user2Mobile = `9${Math.floor(100000000 + Math.random() * 900000000)}`;
  const testPassword = 'Password123!';

  // ==========================================
  // 1. POSITIVE FLOW: USER 1 AUTH & CREATION
  // ==========================================
  console.log(`\n1. [AUTH] Registering Citizen 1 (Mobile: ${user1Mobile})...`);
  const reg1Res = await request('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: `Citizen One ${timestamp}`,
      mobile: user1Mobile,
      password: testPassword,
      email: `citizen1_${timestamp}@example.com`,
      preferredLanguage: 'en',
    }),
  });
  if (!reg1Res.body?.success) throw new Error('Citizen 1 Registration failed');

  const login1Res = await request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile: user1Mobile, password: testPassword }),
  });
  const token1 = login1Res.body?.data?.token;
  if (!token1) throw new Error('Citizen 1 Login failed');
  const auth1 = { Authorization: `Bearer ${token1}`, 'Content-Type': 'application/json' };

  console.log(`\n2. [AUTH] Registering Citizen 2 (Mobile: ${user2Mobile})...`);
  const reg2Res = await request('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: `Citizen Two ${timestamp}`,
      mobile: user2Mobile,
      password: testPassword,
      email: `citizen2_${timestamp}@example.com`,
      preferredLanguage: 'hi',
    }),
  });
  if (!reg2Res.body?.success) throw new Error('Citizen 2 Registration failed');

  const login2Res = await request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile: user2Mobile, password: testPassword }),
  });
  const token2 = login2Res.body?.data?.token;
  if (!token2) throw new Error('Citizen 2 Login failed');
  const auth2 = { Authorization: `Bearer ${token2}`, 'Content-Type': 'application/json' };

  console.log('\n3. [GRIEVANCE] Creating Grievance as Citizen 1...');
  const createRes = await request('/grievances', {
    method: 'POST',
    headers: auth1,
    body: JSON.stringify({
      title: 'Water supply interruption in Sector 4',
      description: 'The main pipeline supplying drinking water has broken and dirty muddy water is flowing.',
      departmentId: 'water_supply_dept',
      category: 'Water Supply Interruption',
      state: 'Maharashtra',
      district: 'Pune',
    }),
  });
  const grievance1 = createRes.body?.data;
  if (!grievance1) throw new Error('Grievance creation failed');
  console.log(`   Grievance 1 Created: ${grievance1.id} (${grievance1.grievanceNumber})`);

  console.log('\n4. [ATTACHMENT] Citizen 1 Uploading Attachment...');
  const blob = new Blob(['Proof document content'], { type: 'image/png' });
  const form = new FormData();
  form.append('file', blob, 'proof.png');
  const uploadRes = await fetch(`${BASE_URL}/grievances/${grievance1.id}/attachments`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token1}` },
    body: form,
  });
  const uploadJson: any = await uploadRes.json();
  const attachment1 = uploadJson.data;
  if (!attachment1) throw new Error('Attachment upload failed');
  console.log(`   Attachment Created: ${attachment1.id}`);

  // ==========================================
  // 2. NEGATIVE & SECURITY TEST SUITE
  // ==========================================
  console.log('\n--- EXECUTING NEGATIVE & SECURITY TEST SUITE ---');

  console.log('\n5. [SECURITY] Testing Unauthenticated Access to /api/grievances...');
  const unauthRes = await request('/grievances');
  console.log(`   Unauthenticated access status: ${unauthRes.status} (Expected 401) -> ${unauthRes.status === 401 ? '✓ PASSED' : '✗ FAILED'}`);
  if (unauthRes.status !== 401) throw new Error('Unauthenticated access was not rejected');

  console.log('\n6. [SECURITY] Testing IDOR: Citizen 2 accessing Citizen 1 grievance detail...');
  const idorGrievanceRes = await request(`/grievances/${grievance1.id}`, { headers: auth2 });
  console.log(`   Citizen 2 access status: ${idorGrievanceRes.status} (Expected 404) -> ${idorGrievanceRes.status === 404 ? '✓ PASSED' : '✗ FAILED'}`);
  if (idorGrievanceRes.status !== 404) throw new Error('IDOR vulnerability on grievance detail');

  console.log('\n7. [SECURITY] Testing IDOR: Citizen 2 uploading attachment to Citizen 1 grievance...');
  const evilBlob = new Blob(['Evil content'], { type: 'image/png' });
  const evilForm = new FormData();
  evilForm.append('file', evilBlob, 'evil.png');
  const idorUploadRes = await fetch(`${BASE_URL}/grievances/${grievance1.id}/attachments`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token2}` },
    body: evilForm,
  });
  console.log(`   Citizen 2 upload status: ${idorUploadRes.status} (Expected 404) -> ${idorUploadRes.status === 404 ? '✓ PASSED' : '✗ FAILED'}`);
  if (idorUploadRes.status !== 404) throw new Error('IDOR vulnerability on attachment upload');

  console.log('\n8. [SECURITY] Testing IDOR: Citizen 2 downloading Citizen 1 attachment...');
  const idorDownloadRes = await request(`/grievances/${grievance1.id}/attachments/${attachment1.id}/download`, { headers: auth2 });
  console.log(`   Citizen 2 download status: ${idorDownloadRes.status} (Expected 404) -> ${idorDownloadRes.status === 404 ? '✓ PASSED' : '✗ FAILED'}`);
  if (idorDownloadRes.status !== 404) throw new Error('IDOR vulnerability on attachment download');

  console.log('\n9. [VALIDATION] Testing Invalid Department ID format...');
  const invalidDeptRes = await request('/grievances', {
    method: 'POST',
    headers: auth1,
    body: JSON.stringify({
      title: 'Valid title for testing invalid dept',
      description: 'Valid description that has sufficient length for validation testing.',
      departmentId: 'invalid_dept_format_without_suffix',
      category: 'General',
      state: 'Maharashtra',
      district: 'Pune',
    }),
  });
  console.log(`   Invalid dept status: ${invalidDeptRes.status} (Expected 400) -> ${invalidDeptRes.status === 400 ? '✓ PASSED' : '✗ FAILED'}`);
  if (invalidDeptRes.status !== 400) throw new Error('Invalid department ID was not rejected');

  console.log('\n10. [VALIDATION] Testing Disallowed File Type Upload (.exe)...');
  const exeBlob = new Blob(['binary executable payload'], { type: 'application/x-msdownload' });
  const exeForm = new FormData();
  exeForm.append('file', exeBlob, 'malware.exe');
  const exeUploadRes = await fetch(`${BASE_URL}/grievances/${grievance1.id}/attachments`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token1}` },
    body: exeForm,
  });
  const exeJson: any = await exeUploadRes.json();
  console.log(`   Disallowed file status: ${exeUploadRes.status} (Expected 400) -> ${exeUploadRes.status === 400 ? '✓ PASSED' : '✗ FAILED'}`);
  if (exeUploadRes.status !== 400) throw new Error('Disallowed file upload was not rejected');

  console.log('\n11. [STATE GUARDS] Testing Premature Feedback & Appeal...');
  const preFeedbackRes = await request(`/grievances/${grievance1.id}/feedback`, {
    method: 'POST',
    headers: auth1,
    body: JSON.stringify({ rating: 5, comment: 'Premature feedback test' }),
  });
  console.log(`   Premature feedback status: ${preFeedbackRes.status} (Expected 400) -> ${preFeedbackRes.status === 400 ? '✓ PASSED' : '✗ FAILED'}`);
  if (preFeedbackRes.status !== 400) throw new Error('Premature feedback was not rejected');

  const preAppealRes = await request(`/grievances/${grievance1.id}/appeal`, {
    method: 'POST',
    headers: auth1,
    body: JSON.stringify({ reason: 'Premature appeal reason here', description: 'Premature appeal description test longer than 20 chars' }),
  });
  console.log(`   Premature appeal status: ${preAppealRes.status} (Expected 400) -> ${preAppealRes.status === 400 ? '✓ PASSED' : '✗ FAILED'}`);
  if (preAppealRes.status !== 400) throw new Error('Premature appeal was not rejected');

  console.log('\n=============================================================');
  console.log('🎉 ALL INTEGRATION & NEGATIVE SECURITY TESTS PASSED (100%)!');
  console.log('=============================================================');

  server.close();
  process.exit(0);
}

runTests().catch((err) => {
  console.error('❌ E2E Integration & Security Test Failed:', err);
  if (server) server.close();
  process.exit(1);
});
