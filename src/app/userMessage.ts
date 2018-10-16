import { MessageType } from './barrel';

//simple, immutable value object

export interface UserMessage {
  readonly message: string;
  readonly messageType: MessageType;
}
