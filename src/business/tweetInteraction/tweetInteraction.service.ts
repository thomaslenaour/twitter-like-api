import { Injectable } from '@nestjs/common';

import { GetOrCreateOrDeleteTweetInteractionDto } from './dto/tweetInteraction.dto';

import { TweetInteractionRepository } from './tweetInteraction.repository';

@Injectable()
export class TweetInteractionService {
  constructor(private tweetInteractionRepository: TweetInteractionRepository) {}

  async getUniqueTweetInteraction(
    data: GetOrCreateOrDeleteTweetInteractionDto,
  ) {
    try {
      return await this.tweetInteractionRepository.getUniqueTweetInteraction(
        data,
      );
    } catch (err) {
      throw err;
    }
  }

  async createTweetInteraction(data: GetOrCreateOrDeleteTweetInteractionDto) {
    try {
      return await this.tweetInteractionRepository.createTweetInteraction(data);
    } catch (err) {
      throw err;
    }
  }

  async deleteTweetInteraction(data: GetOrCreateOrDeleteTweetInteractionDto) {
    try {
      return await this.tweetInteractionRepository.deleteTweetInteraction(data);
    } catch (err) {
      throw err;
    }
  }
}
