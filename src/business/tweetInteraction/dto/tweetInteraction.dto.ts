import { BTweetInteractionType } from '../model/tweetInteraction.model';

export class GetOrCreateOrDeleteTweetInteractionDto {
  tweetId: string;
  userId: string;
  type: BTweetInteractionType;
}
