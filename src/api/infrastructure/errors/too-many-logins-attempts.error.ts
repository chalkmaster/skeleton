import { R } from '../resources';

export class TooManyLoginAttemptsError extends Error {
  constructor(public message: string = R.ERROR_MESSAGE.TOO_MANY_LOGIN_ATTEMPTS) {
    super(message);
    this.name = R.ERROR_TYPE.TOO_MANY_LOGIN_ATTEMPTS_ERROR;
  }
}