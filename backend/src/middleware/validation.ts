import { Request, Response, NextFunction } from 'express';

export const validateRequest = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error: any) {
      if (error.errors) {
        res.status(400).json({
          success: false,
          message: 'Validation error',
        });
        return;
      }
      res.status(400).json({
        success: false,
        message: 'Invalid request data'
      });
    }
  };
};
