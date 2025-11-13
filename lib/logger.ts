/**
 * Production-ready logger utility
 * Only logs in development mode
 */

type LogLevel = "log" | "error" | "warn" | "debug" | "info";

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";

  private log(level: LogLevel, ...args: unknown[]): void {
    if (!this.isDevelopment) return;

    switch (level) {
      case "error":
        console.error(...args);
        break;
      case "warn":
        console.warn(...args);
        break;
      case "debug":
        console.debug(...args);
        break;
      case "info":
        console.info(...args);
        break;
      default:
        console.log(...args);
    }
  }

  error(...args: unknown[]): void {
    // Errors should always be logged, even in production
    if (process.env.NODE_ENV === "development") {
      console.error(...args);
    }
    // In production, you might want to send to error tracking service
    // Example: Sentry.captureException(args[0]);
  }

  warn(...args: unknown[]): void {
    this.log("warn", ...args);
  }

  debug(...args: unknown[]): void {
    this.log("debug", ...args);
  }

  info(...args: unknown[]): void {
    this.log("info", ...args);
  }
}

export const logger = new Logger();
