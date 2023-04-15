import Product from './product.model';
import ProductImage from '../product-image/product-image.model';
import AppLogger from '../../core/eventLogger';
import ProductShipping from '../product-shipping/product-shipping.model';

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

  async createProduct(productData : any): Promise<Product> {
    try {
      const { name, category_id, content, status, stock, sku, price, discount_id, shipping_id } = productData;
      
      const product =  await Product.create({
        name, category_id,content,status,
        stock, sku, price, discount_id
      });
      
      const createdProduct = await Product.findByPk(product.id);
      
      if (createdProduct) {
        try {
          await ProductShipping.upsert({
            product_id: product.id,
            shipping_id: shipping_id,
          });
        } catch (error) {
          throw new Error(`Failed to create ProductShipping: ${error}`);
        }
      }
      

      
      //this.setRelations(productData, product)

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

  async setRelations(productData: Product, createdProduct: Product): Promise<void> {
    console.log('test', JSON.stringify(productData));
    // if (productData.images && productData.images.length > 0) {
    //   productData.images.forEach((image) => {
    //     console.log('image', '2222');
    //   });
    // }

    if (Number.isInteger(productData.shipping_id)) {
      // set product_shipping table

    }
  }

}

export default new ProductService();
