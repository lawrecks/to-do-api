import { IsOptional } from 'class-validator';

export class PaginationOptions {
  @IsOptional()
  readonly page?: number;

  @IsOptional()
  readonly limit?: number;

  @IsOptional()
  readonly search?: string;
}
