const fs = require("fs").promises;
const path = require("path");
const { formatLogEntry } = require("./formatters");

class Logger {
  constructor() {
    this.logDir = path.join(__dirname, "../../../../logs/");
    this.accessLogPath = path.join(this.logDir, "access.log");
    this.errorLogPath = path.join(this.logDir, "error.log");
    this.appLogPath = path.join(this.logDir, "app.log");
  }

  // 确保日志目录存在
  async ensureLogDir() {
    try {
      await fs.mkdir(this.logDir, { recursive: true });
    } catch (error) {
      console.error(`Failed to create log directory: ${error.message}`);
    }
  }

  // 写入日志
  async writeLog(filePath, message) {
    try {
      await fs.appendFile(filePath, message + "\n", { flag: "a" });
    } catch (error) {
      console.error(`Failed to write log to ${filePath}: ${error.message}`);
    }
  }

  // 记录访问日志
  async access(data) {
    const message = formatLogEntry("access", data);
    await this.writeLog(this.accessLogPath, message);
  }

  // 记录错误日志
  async error(error) {
    const message = formatLogEntry("error", error.stack || error.message);
    await this.writeLog(this.errorLogPath, message);
  }

  // 记录应用日志
  async info(message) {
    const formatted = formatLogEntry("info", message);
    await this.writeLog(this.appLogPath, formatted);
  }

  // 调试日志（仅开发环境）
  async debug(message) {
    const formatted = formatLogEntry("debug", message);
    await this.writeLog(this.appLogPath, formatted);
  }

  // 初始化
  async init() {
    await this.ensureLogDir();
  }
}

module.exports = new Logger();
