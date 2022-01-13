import { BTweetInteractionType } from '../model/tweetInteraction.model';

export class CreateTweetInteractionDto {
  tweetId: string;
  userId: string;
  type: BTweetInteractionType;
}
