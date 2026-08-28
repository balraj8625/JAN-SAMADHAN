import prisma from '../config/database.js';

export const getAllDepartments = async () => {
  const departments = await prisma.department.findMany({
    orderBy: { nameEn: 'asc' }
  });

  return departments.map(dept => ({
    id: dept.id,
    name: {
      en: dept.nameEn,
      hi: dept.nameHi,
      mr: dept.nameMr
    },
    category: dept.category
  }));
};

export const getDepartmentById = async (id: string) => {
  const department = await prisma.department.findUnique({
    where: { id }
  });

  if (!department) {
    throw new Error('Department not found');
  }

  return {
    id: department.id,
    name: {
      en: department.nameEn,
      hi: department.nameHi,
      mr: department.nameMr
    },
    category: department.category
  };
};
