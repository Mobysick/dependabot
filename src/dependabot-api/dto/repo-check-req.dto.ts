import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RepoCheckReqDto {
  @IsString()
  @IsNotEmpty()
  user: string | undefined;

  @IsString()
  @IsNotEmpty()
  repo: string | undefined;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  emails: string[] | undefined;

  @IsBoolean()
  @IsOptional()
  subscribe: boolean | undefined;
}
