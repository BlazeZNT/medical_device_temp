import type { ResultEnum } from '@/enums/httpEnum';

declare interface API<T = any> {
  code: ResultEnum
  data?: T
  msg: string
}
