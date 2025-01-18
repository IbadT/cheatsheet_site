import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty } from "class-validator"

export class AddLikeDto{
    @ApiProperty({
      type: String,
      required: true,
      description: "user_id",
      example: "20ec594c-bd84-43d9-9b78-36b52883a4e7"
    })
    @IsString()
    @IsNotEmpty()
    user_id: string
  
    @ApiProperty({
      type: String,
      required: true,
      description: "post_id",
      example: "be358101-032a-4f16-9b2d-7a7e92aaac86"
    })
    @IsString()
    @IsNotEmpty()
    post_id: string
  }
  