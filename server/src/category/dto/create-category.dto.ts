import { IsString, IsNotEmpty, MaxLength, IsBoolean } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Category name is required.' })
  @MaxLength(50, { message: 'Category name must not exceed 50 characters.' })
  readonly name: string;

  @IsString()
  @MaxLength(200, { message: 'Description must not exceed 200 characters.' })
  readonly description: string;

  @IsBoolean({ message: 'Status must be a boolean value.' })
  readonly status: boolean;
}
