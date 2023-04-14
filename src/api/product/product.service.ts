import Product from './product.model';

export class ProductService {
  private readonly products: Product[] = [];

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

  async createProduct(name: string, description: string, price: number): Promise<Product> {
    try {
      const product = await Product.create({
        name,
        description,
        price,
      });
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
}

export default new ProductService();
