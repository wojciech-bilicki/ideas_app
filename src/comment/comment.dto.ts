import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CommentDTO {
  @ApiModelProperty()
  @IsString()
  comment: string;
}
