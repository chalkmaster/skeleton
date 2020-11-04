import { R } from './resources';
import { SecurityHelper } from '../helpers/security.helper';

export class Logger {
  private static logOut = console.log;
  private static infoOut = console.info;
  private static warnOut = console.warn;
  private static errorOut = console.error;
  private static debugOut = console.debug;
  static time = console.time;
  static timeEnd = console.timeEnd;
  static timeLog = console.timeLog;
  static timeStamp = console.timeStamp;
  static timeline = console.timeline;
  static timelineEnd = console.timelineEnd;
  static trace = console.trace;

  static setupConsole() {
    console.log = Logger.log;
    console.info = Logger.info;
    console.warn = Logger.warning;
    console.error = Logger.error;
    console.debug = Logger.debug;
    console.time = () => {};
    console.timeEnd = () => {};
    console.timeLog = () => {};
    console.timeStamp = () => {};
    console.timeline = () => {};
    console.timelineEnd = () => {};
    console.trace = () => {};
  }

  static audit(info: any, ...optionalParams: any[]) {
    return new Promise((resolve, _) => {
      optionalParams.forEach(Logger.obfuscate);
      Logger.logOut('AUDIT', new Date(), Logger.obfuscate(info), ...optionalParams);
      resolve();
    });
  }

  static log(info: any, ...optionalParams: any[]) {
    return new Promise((resolve, _) => {
      optionalParams.forEach(Logger.obfuscate);
      Logger.logOut('LOG', new Date(), Logger.obfuscate(info), ...optionalParams);
      resolve();
    });
  }
  
  static info(info: any, ...optionalParams: any[]) {
    return new Promise((resolve, _) => {
      optionalParams.forEach(Logger.obfuscate);
      Logger.infoOut('INFO', new Date(), Logger.obfuscate(info), ...optionalParams);
      resolve();
    });
  }

  static warning(info: any, ...optionalParams: any[]) {
    return new Promise((resolve, _) => {
      optionalParams.forEach(Logger.obfuscate);
      Logger.warnOut('WARNING', new Date(), Logger.obfuscate(info), ...optionalParams);
      resolve();
    });
  }

  static security(info: any, ...optionalParams: any[]) {
    return new Promise((resolve, _) => {
      optionalParams.forEach(Logger.obfuscate);
      Logger.warnOut('SECURITY', new Date(), Logger.obfuscate(info), ...optionalParams);
      resolve();
    });
  }

  static debug(info: any, ...optionalParams: any[]) {
    return new Promise((resolve, _) => {
      if (process.env.NODE_ENV === R.ENV.DEVELOPMENT){
        optionalParams.forEach(Logger.obfuscate);
        Logger.debugOut('DEBUG', new Date(), info, ...optionalParams);
      }
      resolve();
    });
  }

  static error(error: Error, ...optionalParams: any[]) {
    return new Promise((resolve, reject) => {
      if (!error) reject();

      if (error.name === R.ERROR_TYPE.NOT_AUTHORIZED_ERROR) {
        Logger.security(error, optionalParams);
        resolve();
        return;
      }
      if (error.name === R.ERROR_TYPE.JSON_WEB_TOKEN_ERROR) {
        Logger.security(error, optionalParams);
        resolve();
        return;
      }
      if (error.name === R.ERROR_TYPE.TOO_MANY_LOGIN_ATTEMPTS_ERROR) {
        Logger.security(error, optionalParams);
        resolve();
        return;
      }
      if (error.name === R.ERROR_TYPE.TOKEN_EXPIRED_ERROR) return;
      Logger.errorOut('ERROR', new Date(), Logger.obfuscate(error), ...optionalParams);
      resolve();
    });
  }

  private static obfuscate(info: any): any{
    if (info && typeof(info) === "object" && !info.getDate && !info.stack) {
      info = {...info};
      for (let key in info) {
        if (Logger.shouldObfuscateKey(key)) {
          if (typeof(info[key]) === "string") {
            info[key] = SecurityHelper.getHash(info[key] || '');
          } else if (typeof(info[key]) === "object" && !info[key].getDate) {
            info[key] = Logger.obfuscate(info[key]);
          }
        }
      }
    } else if (typeof(info) === "string") {
      return Logger.obfuscatePartialString(info);
    }
    return info;
  }

  private static shouldObfuscateKey(key: string): boolean {
    return !!(
      key.match(/\buser\b|\busuario|\busr\b|\busu\b|\busername\b/gi) || //usuário
      key.match(/\bemail\b|\bmail\b|\buseremail\b/gi) || //e-mail
      key.match(/\bpass\b|\bsenha\b|\bpassword\b|\bpwd\b/gi) || //senha
      key.match(/\bnome\b|\bname\b/gi) || //nome
      key.match(/\bsecurityphrase\b|\bfrase\b|\bfrasedeseguranca\b|\bphrase\b/gi) || //frase secreta
      key.match(/\bcpf\b|\bcnpj\b|\bdocumento\b|\bdocument\b|\bdoc\b|\bdocto\b/gi) || //documento
      key.match(/\bphone\b|\bcellphone\b|\btelefone\b|\bcelular\b|\bfone\b|\userphone\b/gi) //telefone
    );
  }

  private static obfuscatePartialString(value: string) {
    const cpfs = value.match(/([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/g);
    const cnpjs = value.match(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})/g);
    const telefones = value.match(/(\d{9,13})|(\+\d{1,3})?[\d()\s\-]{9,16}/g);
    const emails = value.match(/([a-z0-9._-]+@[a-z0-9]+\.([a-z]{2,3})(\.[a-z]{2,3})?)/gi);

    if (cpfs && cpfs.length) {
      cpfs.forEach(item => value = value.replace(new RegExp(item, 'g'), SecurityHelper.getHash(item)));
    }

    if (cnpjs && cnpjs.length) {
      cnpjs.forEach(item => value = value.replace(new RegExp(item, 'g'), SecurityHelper.getHash(item)));
    }

    if (telefones && telefones.length) {
      telefones.forEach(item => value = value.replace(new RegExp(item, 'g'), SecurityHelper.getHash(item)));
    }

    if (emails && emails.length) {
      emails.forEach(item => value = value.replace(new RegExp(item, 'g'), SecurityHelper.getHash(item)));
    }

    return value;
  }
}