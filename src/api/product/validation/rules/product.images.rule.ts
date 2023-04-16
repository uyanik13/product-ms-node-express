import { CustomValidator } from 'express-validator';

const imageValidationRule: CustomValidator = (value, { req }) => {
  if (!req.files) {
    throw new Error('Images are required');
  }

  if (!req.files['images[]'] || req.files['images[]'].length === 0) {
    throw new Error('Images must be an array with at least one image');
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
