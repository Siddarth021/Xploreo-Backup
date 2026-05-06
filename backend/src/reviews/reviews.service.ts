import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsRepository } from './reviews.repository';

@Injectable()
export class ReviewsService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  create(dto: CreateReviewDto) {
    return this.reviewsRepository.create(dto);
  }

  findAll() {
    return this.reviewsRepository.findAll();
  }

  findOne(id: number) {
    const review = this.reviewsRepository.findById(id);
    if (!review) throw new NotFoundException(`Review ${id} not found`);
    return review;
  }

  update(id: number, dto: UpdateReviewDto) {
    const updated = this.reviewsRepository.update(id, dto);
    if (!updated) throw new NotFoundException(`Review ${id} not found`);
    return updated;
  }

  remove(id: number) {
    const deleted = this.reviewsRepository.delete(id);
    if (!deleted) throw new NotFoundException(`Review ${id} not found`);
    return { message: `Review ${id} deleted` };
  }
}
