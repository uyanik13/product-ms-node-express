import Product from './product.model';
import ProductImage from '../product-image/product-image.model';
import AppLogger from '../../core/eventLogger';
import ProductShipping from '../product-shipping/product-shipping.model';
import ProductSize from '../product-size/product-size.model';
import ProductVariantOption from '../product-variant-option/product-variant-option.model';
import ProductVariantOptionPrice from '../product-variant-option-price/product-variant-option-price.model';
import ProductVariantOptionInventory from '../product-variant-option-inventory/product-variant-option-inventory.model';
import { createUploadMiddleware } from '../../utilities/multerConfig';
import { Request, Response, NextFunction } from 'express';

let logger = new AppLogger();

export class ProductService {
  private readonly products: Product[] = [];
  private readonly productImages: ProductImage[] = [];

  async getProducts(): Promise<Product[]> {
    try {
      const products = await Product.findAll();
      return products;
    } catch (error) {
      throw new Error(`Failed to retrieve products: ${error}`);
    }
  }

  async getProductById(id: string): Promise<Product> {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }

  async createProduct(req : any): Promise<Product> {
    try {
      
      const request = req.body
      const { name, category_id, content, status, stock, sku, price, discount_id, shipping_id } = request;
      const product =  await Product.create({
        name, category_id,content,status,
        stock, sku, price, discount_id
      });
      
      //this.setRelations(request, product)
      this.setImages(req, product)

      return product;
    } catch (error) {
      throw new Error(`Failed to create product: ${error}`);
    }
  }

  async updateProduct(id: string, name: string, description: string, price: number): Promise<Product> {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error(`Product with id: ${id} not found`);
      }
      await product.update({ name, description, price });
      return product;
    } catch (error) {
      throw new Error(`Failed to update product with id: ${id}`);
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error(`Product with id: ${id} not found`);
      }
      await product.destroy();
    } catch (error) {
      throw new Error(`Failed to delete product with id: ${id}`);
    }
  }

  protected async setRelations(request: any, product:Product): Promise<void> {
    this.createProductShipping(request, product)
    this.createSize(request, product)
    this.createVariants(request, product)
  }

  protected async setImages(request: Request, product: Product): Promise<void> {
    const uploadFolderPath = 'uploads/';
    const fileNamePrefix = 'customPrefix';

    // Create the upload middleware with custom path and file name
    const uploadMultiple = createUploadMiddleware(uploadFolderPath, fileNamePrefix);

    return new Promise<void>((resolve, reject) => {
      uploadMultiple(request, {} as Response, async (error: any) => {
        if (error) {
          console.error(error);
          reject(error);
          return;
        }

        try {
          const files = request.files as { [fieldname: string]: Express.Multer.File[] };
          const promises = files['images'].map(async (file) => {
            const imagePath = file.path;

            const uploadedImage = new ProductImage({
              image_url: imagePath,
              image_type: file.mimetype,
              product_id: product.id,
            });

            await uploadedImage.save();
          });

          await Promise.all(promises);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });
  }


  protected async createProductShipping(request: any, product: Product): Promise<void> {
    if (product) {
      try {
        await ProductShipping.upsert({
          product_id: product.id,
          shipping_id: request.shipping_id,
        });
      } catch (error) {
        throw new Error(`Failed to create ProductShipping: ${error}`);
      }
    }
  }

  protected async createSize(request: any, product: Product): Promise<void> {
    const size = {
      weight_type: request['size[weight_type]'],
      weight: request['size[weight]'],
      width: request['size[width]'],
      height: request['size[height]'],
      length: request['size[length]'],
    };
    
    if (product) {
      try {
        await ProductSize.upsert({
          product_id: product.id,
          width: size.width,
          height: size.height,
          length: size.length,
          weight: size.weight,
          weight_type: size.weight_type,
        });
      } catch (error) {
        throw new Error(`Failed to create ProductSize: ${error}`);
      }
    }
  }

  protected async createVariants(request: any, product: Product): Promise<void> {
    const productVariants = JSON.parse(request.product_variants);
  
    for (const variant of productVariants) {
      if (typeof variant === 'object' && variant.hasOwnProperty('id')) {
        const [productVariantOption, created] = await ProductVariantOption.findOrCreate({
          where: {
            product_id: product.id,
            product_variant_id: variant.id,
            value: variant.value
          },
          defaults: {
            product_id: product.id,
            product_variant_id: variant.id,
            value: variant.value
          }
        });
  
        if (created) {
          await ProductVariantOptionInventory.create({
            stock: variant.stock,
            product_id: product.id,
            product_variant_option_id: productVariantOption.id,
          });
  
          await ProductVariantOptionPrice.create({
            price: variant.price,
            product_id: product.id,
            product_variant_option_id: productVariantOption.id,
          });
        } else {
          await ProductVariantOptionInventory.update({
            stock: variant.stock
          }, {
            where: {
              product_id: product.id,
              product_variant_option_id: productVariantOption.id,
            }
          });
  
          await ProductVariantOptionPrice.update({
            price: variant.price
          }, {
            where: {
              product_id: product.id,
              product_variant_option_id: productVariantOption.id,
            }
          });
        }
      }
    }
  }


}

export default new ProductService();
