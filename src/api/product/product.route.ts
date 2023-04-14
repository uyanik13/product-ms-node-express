import express, { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { ProductService } from './product.service';
import ProductController from './product.controller';
import { validationResult } from 'express-validator';
import { productStoreValidationRules } from './validation/product.store.validation';

const router: Router = express.Router();
const MODULE_NAME = 'product';
const productService = new ProductService();
const productController = new ProductController(productService);


const validateRequest = (req: Request, res: Response, next: NextFunction): Response | void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get(`/${MODULE_NAME}`, (req: Request, res: Response) => {
  productController.index(req, res);
});

router.get(`/${MODULE_NAME}/:id`, (req: Request, res: Response) => {
  productController.show(req, res);
});

router.post(
  `/${MODULE_NAME}`,
  productStoreValidationRules, // Pass middleware functions as individual arguments
  validateRequest,
  (req: Request, res: Response) => {
    productController.create(req, res);
  }
);

router.put(`/${MODULE_NAME}/:id`, (req: Request, res: Response) => {
  productController.update(req, res);
});

router.delete(`/${MODULE_NAME}/:id`, (req: Request, res: Response) => {
  productController.destroy(req, res);
});

export default router;
