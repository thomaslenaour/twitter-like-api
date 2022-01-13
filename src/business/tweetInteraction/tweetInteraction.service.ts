import { Injectable } from '@nestjs/common';

import { CreateTweetInteractionDto } from './dto/create-tweetInteraction.dto';
import { GetUniqueTweetInteractionDto } from './dto/get-tweetInteraction.dto';

import { TweetInteractionRepository } from './tweetInteraction.repository';

@Injectable()
export class TweetInteractionService {
  constructor(private tweetInteractionRepository: TweetInteractionRepository) {}

  async getUniqueTweetInteraction(data: GetUniqueTweetInteractionDto) {
    try {
      return await this.tweetInteractionRepository.getUniqueTweetInteraction(
        data,
      );
    } catch (err) {
      throw err;
    }
  }

  async createTweetInteraction(data: CreateTweetInteractionDto) {
    try {
      return await this.tweetInteractionRepository.createTweetInteraction(data);
    } catch (err) {
      throw err;
    }
  }

  async deleteTweetInteraction(tweetInteractionId: string) {
    try {
      return await this.tweetInteractionRepository.deleteTweetInteraction(
        tweetInteractionId,
      );
    } catch (err) {
      throw err;
    }
  }
}
