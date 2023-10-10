import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message, MessageService } from './services/message.service';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private messageService = inject(MessageService);
  chatMessages$ = this.messageService.chatMessages$;
  userMessage: string = '';

  sendMessage() {
    if (this.userMessage.trim() === '') return;
    this.messageService.addMessage({ id: Date.now(), text: this.userMessage, isUser: true });
    this.messageService.getResponse(this.userMessage).subscribe((response) => {
      this.messageService.addMessage({ id: Date.now(), text: response.text, isUser: false });
    });
    this.userMessage = '';
  }

  startListening() {

  }

  trackByFn(index: number, message: Message) {
    return message.id;
  }
}
