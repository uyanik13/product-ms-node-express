import { CustomValidator } from 'express-validator';
import { Multer } from 'multer';

const imageValidationRule: CustomValidator = (value, { req }) => {
  if (!req.files || !req.files['images[]']) {
    throw new Error('Images must be files');
  }

  if (!req.files['images[]'].every((file: Express.Multer.File) => file.mimetype.startsWith('image/'))) {
    throw new Error('Images must be files');
  }

  if (!req.files['images[]'].every((file: Express.Multer.File) => file.size <= 2048 * 1024)) {
    throw new Error('Each image must not exceed 2MB');
  }

  return true;
};

export default imageValidationRule;
