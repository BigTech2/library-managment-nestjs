import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { GeminiService } from '../gemini/gemini.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private chatRepository: Repository<Message>,
    private geminiService: GeminiService,
  ) {}

  async saveMessage(message: string, isBot: boolean): Promise<Message> {
    const newMessage = this.chatRepository.create({
      message,
      isBot,
    });
    
    return this.chatRepository.save(newMessage);
  }

  async getChatHistory(): Promise<Message[]> {
    return this.chatRepository.find({
      order: { createdAt: 'ASC' },
    });
  }

  /**
   * Process a message using the standard generate method (without history)
   */
//   async processMessage(userMessage: string): Promise<string> {
//     // Save user message
//     await this.saveMessage(userMessage, false);
    
//     // Get AI response
//     const botResponse = await this.geminiService.generate(userMessage);
    
//     // Save bot response
//     await this.saveMessage(botResponse, true);
    
//     return botResponse;
//   }

  /**
   * Process a message using chat history for context
   * This provides continuity in the conversation
   */
  async processMessageWithHistory(userMessage: string): Promise<string> {
    // Save user message
    await this.saveMessage(userMessage, false);
    
    // Get chat history
    const chatHistory = await this.getChatHistory();
    
    // Generate response with history context
    const botResponse = await this.geminiService.generateWithHistory(userMessage, chatHistory);
    
    // Save bot response
    await this.saveMessage(botResponse, true);
    
    return botResponse;
  }
}