import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, of } from 'rxjs';

export interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private chatMessages: Message[] = [];
  chatMessages$ = new BehaviorSubject(this.chatMessages);

  addMessage(message: Message) {
    this.chatMessages = [...this.chatMessages, message];
    this.chatMessages$.next(this.chatMessages);
  }

  getResponse(userMessage: string) {
    const botResponse = `This is a bot response for "${userMessage}"`;
    return of({ text: botResponse }).pipe(delay(1000));
  }
}
