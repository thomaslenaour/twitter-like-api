import { BTweetInteractionType } from '../model/tweetInteraction.model';

export class GetUniqueTweetInteractionDto {
  tweetId: string;
  userId: string;
  type: BTweetInteractionType;
}
