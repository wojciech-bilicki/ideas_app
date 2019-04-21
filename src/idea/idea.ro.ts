import { UserRO } from 'src/user/user.ro';

export class IdeaRO {
  id?: string;
  updated: Date;
  created: Date;
  idea: string;
  description: string;
  author: UserRO;
  upvotes?: number;
  downvotes?: number;
}
