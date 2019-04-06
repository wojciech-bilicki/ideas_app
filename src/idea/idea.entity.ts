import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('idea')
export class IdeaEntity {
  @PrimaryColumn('uuid') id: string;

  @Column('text') idea: string;

  @Column('text') description: string;

  @CreateDateColumn() created: Date;

}
