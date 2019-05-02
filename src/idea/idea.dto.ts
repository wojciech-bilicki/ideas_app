import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class IdeaDTO {
  @ApiModelProperty()
  @IsString()
  idea: string;

  @ApiModelProperty()
  @IsString()
  description: string;
}
