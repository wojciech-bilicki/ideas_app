import { Controller, Get, Post, Put } from '@nestjs/common';
import { IdeaService } from './idea.service';

@Controller('idea')
export class IdeaController {

  constructor(private ideaService: IdeaService) {

  }

  @Get()
  showAllIdeas() {

  }

  @Post
  createDiffieHellman() {

  }

  @Get(':id')
  readIdea() {

  }

  @Put(':id')
  updateIdea() {

  }

  @Delete(':id')
  destroyIdea() {

  }

}
