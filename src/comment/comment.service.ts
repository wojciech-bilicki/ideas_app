import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { IdeaEntity } from '../idea/idea.entity';
import { CommentDTO } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(IdeaEntity) private ideaRepository: Repository<IdeaEntity>,
  ) { }

  private toResponseObject(comment: CommentEntity) {
    const responseObject: any = comment;
    if (comment.author) {
      responseObject.author = comment.author.toResponseObject();
    }
    return responseObject;
  }

  async showByIdea(ideaId: string) {
    const idea = await this.ideaRepository.findOne({ where: { id: ideaId }, relations: ['comments', 'comments.author', 'comments.idea'] });
    return idea.comments.map(this.toResponseObject);
  }

  async showByUser(userId: string) {
    const comments = await this.commentRepository.find({
      where: {
        author: { id: userId },
      },
      relations: ['author'],
    });
    return comments.map(this.toResponseObject);
  }

  async show(id: string) {
    const comment = await this.commentRepository.findOne({ where: { id }, relations: ['idea', 'author'] });
    return this.toResponseObject(comment);
  }

  async create(ideaId: string, userId: string, data: CommentDTO) {
    const idea = await this.ideaRepository.findOne(ideaId);
    const user = await this.userRepository.findOne(userId);
    const comment = await this.commentRepository.create({
      ...data,
      idea,
      author: user,
    });

    this.commentRepository.save(comment);
    return this.toResponseObject(comment);
  }

  async destroy(id: string, userId: string) {
    const comment = await this.commentRepository.findOne({ where: { id }, relations: ['author', 'idea'] });
    if (comment.author.id !== userId) {
      throw new HttpException('You do not own this comment', HttpStatus.UNAUTHORIZED);
    }

    this.commentRepository.remove(comment);
    return this.toResponseObject(comment);

  }
}
