import { AppError } from '@Shared/Errors/AppError';

export interface IFieldValidation {
  field: string;
  regex: RegExp;
  validate(value: string): AppError;
}
