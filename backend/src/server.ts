import app from './app.js';
import { PORT } from './config/env.js';

const server = app.listen(PORT, () => {
  console.log(`🚀 JAN-SAMADHAN Backend Server`);
  console.log(`📍 Running on http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`\n📚 API Endpoints:`);
  console.log(`   POST /api/auth/register - Register new user`);
  console.log(`   POST /api/auth/login - Login user`);
  console.log(`   POST /api/auth/verify-otp - Verify OTP`);
  console.log(`   GET  /api/auth/me - Get current user`);
  console.log(`   GET  /api/departments - List all departments`);
  console.log(`   POST /api/grievances - Create grievance`);
  console.log(`   GET  /api/grievances - List user grievances`);
  console.log(`   GET  /api/grievances/:id - Get grievance details`);
  console.log(`   GET  /api/grievances/:id/timeline - Get timeline`);
  console.log(`   POST /api/grievances/:id/feedback - Submit feedback`);
  console.log(`   POST /api/grievances/:id/appeal - Submit appeal`);
  console.log(`   GET  /api/grievances/:id/escalation-check - Check escalation`);
  console.log(`   POST /api/grievances/:id/attachments - Upload attachment`);
  console.log(`   GET  /api/grievances/:id/attachments - Get attachments`);
  console.log(`   POST /api/ai/analyze - Analyze grievance text`);
  console.log(`   POST /api/ai/generate-grievance - Generate draft`);
  console.log(`   POST /api/ai/explain-response - Explain response`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n🛑 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n🛑 SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Process terminated');
    process.exit(0);
  });
});

export default server;
