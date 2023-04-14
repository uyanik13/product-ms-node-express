import { body } from 'express-validator';
import productVariantRule from './rules/product.variant.rule'; 
import productImagesRule from './rules/product.images.rule'; 

export const productStoreValidationRules = [
  body('name').notEmpty().withMessage('Name is required').isLength({ max: 161 }).withMessage('Name must be no more than 161 characters'),
  body('category_id').notEmpty().withMessage('Category ID is required').isInt().withMessage('Category ID must be an integer'),
  body('sku').notEmpty().withMessage('SKU is required'),
  body('shipping_id').notEmpty().withMessage('Shipping ID is required').isInt().withMessage('Shipping ID must be an integer'),
  body('images').isArray().withMessage('Images must be an array'),
  body('images.*').custom(productImagesRule),
  body('product_variants').custom(productVariantRule) 
];
