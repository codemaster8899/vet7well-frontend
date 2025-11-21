// type Nullable<T> = T | undefined | null;

export interface BaseResponseModel<T = any> {
  Data: T | undefined | null; //Nullable<T>;
  Meta: Meta;
}

export interface Meta {
  Success: boolean;
  Code: number;
  Message: string;
  Errors: Array<ErrorItem>;
}

export interface ErrorItem {
  Id: string;
  Description: string;
  Code: number;
  IsRetryable: boolean;
  PropertyName: string;
}
