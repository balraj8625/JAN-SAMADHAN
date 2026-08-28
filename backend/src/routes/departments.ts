import { Router } from 'express';
import { getAllDepartments, getDepartmentById } from '../services/departmentService.js';

const router = Router();

// GET /api/departments - Get all departments
router.get('/', async (_req, res) => {
  try {
    const departments = await getAllDepartments();
    res.json({
      success: true,
      data: departments
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch departments'
    });
  }
});

// GET /api/departments/:id - Get department by ID
router.get('/:id', async (req, res) => {
  try {
    const department = await getDepartmentById(req.params.id);
    res.json({
      success: true,
      data: department
    });
  } catch (error: any) {
    if (error.message === 'Department not found') {
      res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    } else {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch department'
      });
    }
  }
});

export default router;
