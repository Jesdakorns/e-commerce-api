import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JWTGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('product')
@UseGuards(JWTGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Req() req, @Body() createProductDto: CreateProductDto) {
    const token = req?.headers?.authorization?.split('Bearer ')?.[1];
    return this.productService.create(token, createProductDto);
  }

  @Get('all')
  findAll(@Query() query) {
    console.log(
      `🚀 ~ file: product.controller.ts ~ line 29 ~ ProductController ~ findAll ~ query`,
      query,
    );
    return this.productService.findAll(query);
  }

  @Get('topSell')
  findTopSell(@Query() query) {
    return this.productService.findTopSell(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
