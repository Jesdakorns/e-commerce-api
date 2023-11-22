import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { JWTGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('productType')
@UseGuards(JWTGuard)
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @Post()
  create(@Req() req, @Body() createProductTypeDto: CreateProductTypeDto) {
    const token = req?.headers?.authorization?.split('Bearer ')?.[1];
    console.log(
      `🚀 ~ file: product-type.controller.ts ~ line 25 ~ ProductTypeController ~ create ~ token`,
      token,
    );
    return this.productTypeService.create(createProductTypeDto);
  }

  @Get()
  findAll(@Req() req) {
    const token = req?.headers?.authorization?.split('Bearer ')?.[1];
    console.log(
      `🚀 ~ file: product-type.controller.ts ~ line 25 ~ ProductTypeController ~ create ~ token`,
      token,
    );
    return this.productTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductTypeDto: UpdateProductTypeDto,
  ) {
    return this.productTypeService.update(+id, updateProductTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productTypeService.remove(+id);
  }
}
