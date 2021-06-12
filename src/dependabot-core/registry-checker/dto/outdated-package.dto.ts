import { ComparedPackageDto } from './compared-package.dto';

export class OutdatedPackageDto extends ComparedPackageDto {
  name: string | undefined;
}
