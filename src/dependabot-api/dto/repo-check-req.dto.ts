import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RepoCheckReqDto {
  @IsString()
  @IsNotEmpty()
  user!: string;

  @IsString()
  @IsNotEmpty()
  repo!: string;

  @IsArray()
  @IsEmail({}, { each: true })
  @IsNotEmpty({ each: true })
  emails!: string[];

  @IsBoolean()
  @IsOptional()
  subscribe: boolean | undefined;
}
