import { R } from '../resources';

export class NotAuthorizedError extends Error {
  constructor(public message: string = R.ERROR_MESSAGE.NOT_AUTHORIZED) {
    super(message);
    this.name = R.ERROR_TYPE.NOT_AUTHORIZED_ERROR;
  }
}