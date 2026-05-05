import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsService } from './reviews.service';

@ApiTags('Reviews')
@ApiBearerAuth()
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a review' })
  create(@Body() dto: CreateReviewDto) {
    return this.reviewsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reviews' })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get review by ID' })
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a review' })
  update(@Param('id') id: string, @Body() dto: UpdateReviewDto) {
    return this.reviewsService.update(Number(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a review' })
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(Number(id));
  }
}
