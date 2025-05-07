import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*', // In production, restrict this to your domain
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ) {
    // Process the message with chat history for context
    const response = await this.chatService.processMessageWithHistory(message);
    
    // Emit the AI response to the client
    this.server.emit('newMessage', {
      text: response,
      isBot: true,
      createdAt: new Date(),
    });
    
    // Don't return anything here as we're handling the response via emit
    // This prevents the duplicate message issue
  }

  @SubscribeMessage('getHistory')
  async handleGetHistory(@ConnectedSocket() client: Socket) {
    const history = await this.chatService.getChatHistory();
    client.emit('chatHistory', history);
  }
}