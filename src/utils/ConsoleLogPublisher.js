export class ConsoleLogPublisher {
    log(level, ...args) {
        console[level](...args);
    }
}
