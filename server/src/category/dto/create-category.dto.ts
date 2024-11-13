import { IsString, IsNotEmpty, MaxLength, IsBoolean } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Category name is required.' })
  @MaxLength(5, { message: 'Category name must not exceed 5 characters.' })
  readonly name: string;

  @IsString()
  @MaxLength(200, { message: 'Description must not exceed 200 characters.' })
  readonly description: string;

  @IsBoolean({ message: 'Status must be a boolean value.' })
  readonly status: boolean;
}
