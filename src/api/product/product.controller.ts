import { Request, Response } from 'express';
import { ProductService } from './product.service';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const products = await this.productService.getProducts();
      return res.json(products);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const productId = req.params.id;
      const product = await this.productService.getProductById(productId);
      return res.json(product);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description, price } = req.body;
      const newProduct = await this.productService.createProduct(name, description, price);
      return res.status(201).json(newProduct);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const productId = req.params.id;
      const { name, description, price } = req.body;
      const updatedProduct = await this.productService.updateProduct(productId, name, description, price);
      if (!updatedProduct) {
        return res.status(304).send();
      }
      return res.json(updatedProduct);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async destroy(req: Request, res: Response): Promise<Response> {
    try {
      const productId = req.params.id;
      await this.productService.deleteProduct(productId);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default ProductController;
