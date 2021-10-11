import { AppError } from '@Shared/Errors/AppError';
import { IFieldValidation } from '@Shared/Validation/protocols/field-validation';

export class EmailValidation implements IFieldValidation {
  readonly regex: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(readonly field: string) {}

  validate(value: string): AppError {
    return !value || this.regex.test(value) ? null : new AppError(this.field);
  }
}
