import { check } from 'express-validator';
import productVariantRule from './rules/product.variant.rule';
import productImagesRule from './rules/product.images.rule';
import AppLogger from '../../../core/eventLogger';
const circularJSON = require('circular-json');
let logger = new AppLogger();
export const productStoreValidationRules = [
  check('name')
    .not().isEmpty().withMessage('Name is required')
    .isLength({ max: 161 }).withMessage('Name must be no more than 161 characters'),
  check('category_id')
    .not().isEmpty().withMessage('Category ID is required')
    .isInt().withMessage('Category ID must be an integer'),
  check('sku')
    .not().isEmpty().withMessage('SKU is required'),
  check('shipping_id')
    .not().isEmpty().withMessage('Shipping ID is required')
    .isInt().withMessage('Shipping ID must be an integer'),
  // check('images[]')
  //   .custom((value, { req }) => {
  //     if (!req.files || !req.files['images[]']) {
  //       throw new Error('Images are required');
  //     }

  //     const images = req.files['images[]'];
  //     if (!Array.isArray(images) || images.length < 1) {
  //       throw new Error('At least one image file is required');
  //     }

  //     return true;
  //   })
  //   .withMessage('Images are required and must be an array with at least one image')
  //   .custom(productImagesRule),
  check('product_variants').not().custom(productVariantRule)
];
