import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../shared/database/mongo/schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
) {}

async create(name: string, price: number) {
    const newProduct = new this.productModel({ name, price });
    return newProduct.save();
  }

  async findAll(search?: string, page: number = 1, limit: number = 10) {
    const query: any = {};

    // 🔎 Tìm kiếm theo tên sản phẩm
    if (search) {
      query.name = { $regex: search, $options: 'i' }; 
    }

    // 📑 Tính toán phân trang
    const skip = (page - 1) * limit;

    // Lấy danh sách sản phẩm
    const products = await this.productModel
      .find(query)
      .skip(skip)
      .limit(limit);

    // Tổng số sản phẩm khớp query
    const total = await this.productModel.countDocuments(query);

    return {
      total,           // tổng số bản ghi
      page,            // trang hiện tại
      limit,           // số bản ghi mỗi trang
      totalPages: Math.ceil(total / limit),
      products,        // danh sách sản phẩm
    };
  }
async update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
  }

  async remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }  
}
