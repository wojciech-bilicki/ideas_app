import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';

@Entity('idea')
export class IdeaEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('text') idea: string;

  @Column('text') description: string;

  @CreateDateColumn() created: Date;

  @UpdateDateColumn() updated: Date;

  @ManyToOne(type => UserEntity, author => author.ideas)
  author: UserEntity;

  @ManyToMany(type => UserEntity, { cascade: true })
  @JoinTable()
  upvotes: UserEntity[];

  @ManyToMany(type => UserEntity, { cascade: true })
  @JoinTable()
  downvotes: UserEntity[];
}
