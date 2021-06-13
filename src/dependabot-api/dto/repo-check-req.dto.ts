import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { RepoHost } from '../../dependabot-core/repo-checker/types/repo-host.enum';

function convertEnumErrorMessage(name: string, enumaratedObject: Record<string, unknown>): string {
  return `${name} must be one of: [${Object.keys(enumaratedObject).join(', ')}]`;
}

export class RepoCheckReqDto {
  @IsEnum(RepoHost, {
    message: convertEnumErrorMessage('repoHost', RepoHost),
  })
  repoHost: RepoHost = RepoHost.GITHUB;

  @IsString()
  @IsNotEmpty()
  user!: string;

  @IsString()
  @IsNotEmpty()
  repoName!: string;

  @IsArray()
  @IsEmail({}, { each: true })
  @IsNotEmpty({ each: true })
  emails!: string[];

  @IsBoolean()
  @IsOptional()
  subscribe: boolean | undefined;
}
