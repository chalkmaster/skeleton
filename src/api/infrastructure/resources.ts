export const R = {
  ERROR_MESSAGE: {
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    JWT_TOKEN_RENEW_ERROR: 'Impossible to renew, login again.',
    JTW_TOKEN_AUTH_ERROR: 'Failed to authenticate token',
    JWT_TOKEN_EXPIRED: 'Token Expired.',
    NO_TOKEN_PROVIDED: 'No token provided.',
    NO_DEVICEID_PROVIDED: 'No device identifier provided.',
    NOT_AUTHORIZED: 'Not Authrized.',
    TOO_MANY_LOGIN_ATTEMPTS: 'Too many login attempts.',
    QUOTA_EXCEEDED: 'Quota Exceeded'
  },
  ERROR_TYPE: {
    TOKEN_EXPIRED_ERROR: 'TokenExpiredError',
    JSON_WEB_TOKEN_ERROR: 'JsonWebTokenError',
    NOT_AUTHORIZED_ERROR: 'NotAuthorizedError',
    TOO_MANY_LOGIN_ATTEMPTS_ERROR: 'TooManyLoginAttemptsError',
  },
  REQUEST_HEADERS: {
    ACCESS_TOKEN: 'x-access-token',
    DEVICE_ID: 'x-device-id',
    DEVICE_LOCATION: 'x-device-location',
  },
  RESPONSE_HEADERS: {
    RATE_LIMIT: 'x-rate-limit-max',
    RATE_LIMIT_REMAINING: 'x-rate-limit-remaining',
    RATE_LIMIT_TIME: 'x-rate-limit-time'
  },
  ENV: {
    PRODUCTION: 'production',
    HOMOLOGATION: 'homologation',
    DEVELOPMENT: 'development'
  },
  OK: 'OK',
};