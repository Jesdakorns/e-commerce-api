import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
  Query,
} from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { JWTGuard } from '../auth/guards/jwt-auth.guard';

@Controller('promotion')
@UseGuards(JWTGuard)
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post()
  async create(
    // @UploadedFiles() images,
    @Headers('host') host: string,
    @Body() { promotions }: CreatePromotionDto,
    @Query() query,
  ) {
    return this.promotionService.create({ promotions, query });
  }

  @Get()
  findAll() {
    return this.promotionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promotionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePromotionDto: UpdatePromotionDto,
  ) {
    return this.promotionService.update(+id, updatePromotionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promotionService.remove(+id);
  }
  1;
}
