import {ConsoleLogPublisher} from './ConsoleLogPublisher';

class LogService {

    publishers = [];

    constructor() {
        if (window.ENV.app.logToConsole) {
            this.publishers.push(new ConsoleLogPublisher());
        }
    }

    warn(...args) {
        this.log('warn', ...args);
    }

    info(...args) {
        this.log('info', ...args);
    }

    debug(...args) {
        this.log('debug', ...args);
    }

    error(...args) {
        this.log('error', ...args);
    }

    log(level, ...args) {
        this.publishers.forEach(publisher => publisher.log(level, ...args));
    }

}

const logger = new LogService();

export {
    logger
}
