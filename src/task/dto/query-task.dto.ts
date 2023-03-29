import { Transform } from 'class-transformer';
import { IsBoolean, IsDefined } from 'class-validator';

export class QueryTaskDto {
  @IsDefined()
  @IsBoolean()
  @Transform((value: any) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return Boolean(value);
  })
  complete: boolean;
}
