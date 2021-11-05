import { Message, User } from '../../types';

export type MessageAndUser = Message & { user: User }
