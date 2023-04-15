import { check } from 'express-validator';
import productVariantRule from './rules/product.variant.rule';
import productImagesRule from './rules/product.images.rule';

export const productStoreValidationRules = [
  check('name')
    .not().notEmpty().withMessage('Name is required').isLength({ max: 161 }).withMessage('Name must be no more than 161 characters'),
  check('category_id')
    .not().notEmpty().withMessage('Category ID is required').isInt().withMessage('Category ID must be an integer'),
  check('sku')
    .not().notEmpty().withMessage('SKU is required'),
  check('shipping_id')
    .not().notEmpty().withMessage('Shipping ID is required').isInt().withMessage('Shipping ID must be an integer'),
  check('image').not().isArray().withMessage('Images must be an array'),
  check('images.*').not().custom(productImagesRule),
  check('product_variants').not().custom(productVariantRule)
];
