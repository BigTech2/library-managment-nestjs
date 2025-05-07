import { Body, Controller, Post } from "@nestjs/common";
import { GeminiService } from "./gemini.service";

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  // @Post()
  // async generate(@Body('prompt') prompt: string) {

  //   console.log(prompt)
  //   return this.geminiService.generate(prompt);
  // }
}