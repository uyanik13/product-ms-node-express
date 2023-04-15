import { CustomValidator, Meta } from 'express-validator';
import { isPlainObject } from 'lodash';

interface ProductVariant {
  id: number;
  stock: number;
  price: number;
  value: string;
}


const productVariantRule: CustomValidator = (value, { req }) => {
  
  if (!Array.isArray(value)) {
    throw new Error('Product variants must be an array');
  }

  value.forEach((item) => {
    if (!isPlainObject(item)) {
      throw new Error('Product variant must be an object');
    }

    const { id, stock, price, value } = item as ProductVariant;

    if (!Number.isInteger(id) || id < 1) {
      throw new Error('Product variant must have a valid positive integer id');
    }

    if (!Number.isInteger(stock) || stock < 0) {
      throw new Error('Product variant must have a valid non-negative integer stock');
    }

    if (typeof price !== 'number' || price < 0 || !Number.isFinite(price)) {
      throw new Error('Product variant must have a valid non-negative price');
    }    

    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new Error('Product variant must have a non-empty string value');
    }
  });

  return true;
};


export default productVariantRule;
