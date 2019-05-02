import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDTO {
  @ApiModelProperty()
  @IsNotEmpty()
  username: string;

  @ApiModelProperty()
  @IsNotEmpty()
  password: string;
}
