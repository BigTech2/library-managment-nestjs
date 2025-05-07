import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { Injectable, InternalServerErrorException, Logger, OnModuleInit } from '@nestjs/common';
import { Message } from '../message/entities/message.entity';

@Injectable()
export class GeminiService implements OnModuleInit {
  private readonly logger = new Logger(GeminiService.name);
  private genAI: GoogleGenerativeAI;
  private readonly modelName = 'gemini-1.5-flash'; // Use a valid model name

  // Initialize the SDK client when the module loads
  onModuleInit() {
    const apiKey = 'AIzaSyD2gpwoSEj61U_Gn5cmB2zbo98cjoA-kLo'
    if (!apiKey) {
      this.logger.error('GOOGLE_API_KEY environment variable not found.');
      // You might want to throw an error here to prevent the app from starting incorrectly
      throw new Error('Missing GOOGLE_API_KEY environment variable.');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.logger.log(`GeminiService initialized with model: ${this.modelName}`);
  }

  /**
   * Generates content based on a textual prompt using the configured Gemini model.
   * @param prompt The text prompt to send to the model.
   * @returns A promise that resolves to the generated text content.
   * @throws InternalServerErrorException if the API call fails or content is blocked.
   */
  async generate(prompt: string): Promise<string> {
    if (!this.genAI) {
        this.logger.error('Gemini AI Client not initialized.');
        throw new InternalServerErrorException('Gemini AI Client not initialized.');
    }

    this.logger.log(`Generating content for prompt starting with: "${prompt.substring(0, 50)}..."`);

    try {
      // 1. Get the generative model instance
      const model = this.genAI.getGenerativeModel({
        model: this.modelName,
        // Safety settings updated with correct enum values
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        ],
      });

      // 2. Call generateContent with the prompt
      const result = await model.generateContent(prompt);

      // 3. Process the response
      const response = result.response;
      
      // Return the generated text
      return response.text();

    } catch (error) {
      this.logger.error('Error generating content from Gemini API:', error?.message || error);
      // Improve error details if available
      const errorMessage = error?.message || 'An unknown error occurred';
      
      // Re-throw a NestJS exception for proper HTTP response handling upstream
      throw new InternalServerErrorException(`Failed to generate content via Gemini API: ${errorMessage}`);
    }
  }

  /**
   * Creates a chat session with history and generates a response
   * @param prompt The current user prompt
   * @param chatHistory Previous chat messages from database
   * @returns A promise that resolves to the generated text content
   */
  async generateWithHistory(prompt: string, chatHistory: Message[]): Promise<string> {
    if (!this.genAI) {
      this.logger.error('Gemini AI Client not initialized.');
      throw new InternalServerErrorException('Gemini AI Client not initialized.');
    }

    try {
      // Create the model with desired settings
      const model = this.genAI.getGenerativeModel({
        model: this.modelName,
        systemInstruction: "You are a helpful assistant about book consultant that always responds to the user in Vietnamese, using a gentle affection style. Treat them like a long-time client",
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        ],
      });

      // Convert database chat history to Gemini chat format
      const history = this.convertChatHistoryToGeminiFormat(chatHistory);
      
      // Start a chat with history
      const chat = model.startChat({
        history: history,
        generationConfig: {
          temperature: 0.7,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        }
      });

      

      // Send the current message and get response
      const result = await chat.sendMessage(prompt);
      const response = result.response;
      
      return response.text();
    } catch (error) {
      this.logger.error('Error in chat generation:', error?.message || error);
      const errorMessage = error?.message || 'An unknown error occurred';
      throw new InternalServerErrorException(`Chat error: ${errorMessage}`);
    }
  }

  /**
   * Converts database Message objects to Gemini's chat history format
   */
  private convertChatHistoryToGeminiFormat(chatHistory: Message[]) {
    return chatHistory.map(msg => ({
      role: msg.isBot ? "model" : "user",
      parts: [{ text: msg.message }]
    }));
  }
}