import { useContext } from 'react';
import { GrievanceContext } from './grievanceContextDef';

export const useGrievance = () => {
  const context = useContext(GrievanceContext);
  if (!context) {
    throw new Error('useGrievance must be used within a GrievanceProvider');
  }
  return context;
};

