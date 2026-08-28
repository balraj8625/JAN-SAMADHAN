export interface AIAnalysisResult {
  summary: string;
  issue: string;
  department: string;
  category: string;
  missingInformation: string[];
}

export const analyzeGrievanceText = (text: string): AIAnalysisResult => {
  const lowerText = text.toLowerCase();

  // Simple keyword-based analysis for prototype
  // This will be replaced with actual AI integration later
  
  let department = 'General Administration';
  let issue = 'General grievance';
  let category = 'Other';
  const missingInformation: string[] = [];

  if (lowerText.includes('scholarship') || lowerText.includes('student') || lowerText.includes('education')) {
    department = 'Education / Scholarship';
    issue = 'Scholarship related issue';
    category = 'Payment Delay';
    missingInformation.push('applicationNumber', 'applicationDate', 'institutionName');
  } else if (lowerText.includes('pf') || lowerText.includes('provident fund') || lowerText.includes('epfo')) {
    department = 'EPFO (Employees Provident Fund)';
    issue = 'PF withdrawal/transfer issue';
    category = 'Withdrawal/Pension';
    missingInformation.push('uanNumber', 'establishmentId');
  } else if (lowerText.includes('railway') || lowerText.includes('train') || lowerText.includes('ticket')) {
    department = 'Railways';
    issue = 'Railway service issue';
    category = 'Ticket/Refund';
    missingInformation.push('pnrNumber', 'trainNumber');
  } else if (lowerText.includes('electricity') || lowerText.includes('power') || lowerText.includes('bill')) {
    department = 'Electricity / Power Department';
    issue = 'Electricity supply/billing issue';
    category = 'Billing/Supply';
    missingInformation.push('consumerNumber', 'billNumber');
  } else if (lowerText.includes('water') || lowerText.includes('supply') || lowerText.includes('tap')) {
    department = 'Water Supply & Sanitation';
    issue = 'Water supply issue';
    category = 'Supply/Sanitation';
    missingInformation.push('connectionNumber', 'area');
  } else if (lowerText.includes('road') || lowerText.includes('pothole') || lowerText.includes('street light')) {
    department = 'Municipal Services';
    issue = 'Infrastructure issue';
    category = 'Maintenance';
    missingInformation.push('location', 'landmark');
  } else if (lowerText.includes('ration') || lowerText.includes('pds') || lowerText.includes('food')) {
    department = 'Food, Civil Supplies & Consumer Protection';
    issue = 'Ration/PDS issue';
    category = 'Distribution';
    missingInformation.push('rationCardNumber', 'dealerName');
  } else if (lowerText.includes('health') || lowerText.includes('hospital') || lowerText.includes('medicine')) {
    department = 'Health & Family Welfare';
    issue = 'Healthcare service issue';
    category = 'Service/Medicine';
    missingInformation.push('hospitalName', 'treatmentDate');
  }

  const summary = `Citizen reports ${issue.toLowerCase()} requiring attention from ${department}.`;

  return {
    summary,
    issue,
    department,
    category,
    missingInformation
  };
};

export const generateGrievanceDraft = (keywords: string[]): { title: string; description: string; departmentSuggestion: string } => {
  // Placeholder for AI-generated grievance draft
  return {
    title: `Grievance regarding ${keywords.join(', ')}`,
    description: 'Please provide detailed description of your issue...',
    departmentSuggestion: 'General Administration'
  };
};

export const explainResponse = (responseText: string): { simplified: string; actionItems: string[] } => {
  // Placeholder for AI-explained government response
  return {
    simplified: responseText,
    actionItems: ['Review the response', 'Contact department if clarification needed']
  };
};
