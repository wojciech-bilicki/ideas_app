import * as bcrypt from 'bcryptjs';
import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { UserRO } from './user.ro';
import { IdeaEntity } from '../idea/idea.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column('text')
  password: string;

  @OneToMany(type => IdeaEntity, idea => idea.author)
  ideas: IdeaEntity[];

  @ManyToMany(type => IdeaEntity, { cascade: true })
  @JoinTable()
  bookmarks: IdeaEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken: boolean = true): UserRO {
    const { id, created, username } = this;
    const responseObject: UserRO = { id, created, username };
    if (showToken) {
      const { token } = this;
      responseObject.token = token;
    }
    if (this.ideas) {
      responseObject.ideas = this.ideas;
    }
    if (this.bookmarks) {
      responseObject.bookmarks = this.bookmarks;
    }
    return responseObject;
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  get token() {
    console.log(process.env);
    const { id, username } = this;
    return jwt.sign({
      id,
      username,
    }, process.env.SECRET, { expiresIn: '7d' });
  }
}
