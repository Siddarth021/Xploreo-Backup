import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto, ReviewTargetType } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

type Review = {
  id: number;
  userId: number;
  targetType: ReviewTargetType;
  targetId: number;
  rating: number;
  comment: string;
  createdAt: Date;
};

@Injectable()
export class ReviewsService {
  private reviews: Review[] = [
    {
      id: 1,
      userId: 20001,
      targetType: ReviewTargetType.GUIDE,
      targetId: 10001,
      rating: 5,
      comment: 'Friendly guide and a very well planned city walk.',
      createdAt: new Date(),
    },
  ];

  private nextId = 2;

  create(dto: CreateReviewDto): Review {
    const review: Review = {
      id: this.nextId++,
      userId: dto.userId,
      targetType: dto.targetType,
      targetId: dto.targetId,
      rating: dto.rating,
      comment: dto.comment,
      createdAt: new Date(),
    };

    this.reviews.push(review);
    return review;
  }

  findAll(): Review[] {
    return [...this.reviews].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }

  findOne(id: number): Review {
    const review = this.reviews.find((item) => item.id === id);
    if (!review) throw new NotFoundException(`Review ${id} not found`);
    return review;
  }

  update(id: number, dto: UpdateReviewDto): Review {
    const index = this.reviews.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Review ${id} not found`);

    this.reviews[index] = {
      ...this.reviews[index],
      ...dto,
      id: this.reviews[index].id,
      createdAt: this.reviews[index].createdAt,
    };

    return this.reviews[index];
  }

  remove(id: number) {
    const index = this.reviews.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Review ${id} not found`);

    this.reviews.splice(index, 1);
    return { message: `Review ${id} deleted` };
  }
}
