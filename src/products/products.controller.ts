import { Controller, Get, Post, Body, Query, Put, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // API tạo product
  @Post()
  async create(@Body() body: { name: string; price: number }) {
    return this.productsService.create(body.name, body.price);
  }

  // API lấy danh sách product (có search + phân trang)
  @Get()
  async getAllProducts(
    @Query('search') search?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.productsService.findAll(search, Number(page), Number(limit));
  }

@Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

}
