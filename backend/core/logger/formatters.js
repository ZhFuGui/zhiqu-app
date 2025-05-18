function formatLogEntry(level, message) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Shanghai",
    hour12: false,
  };

  const timestamp = new Intl.DateTimeFormat("zh-CN", options).format(
    new Date()
  );
  // 输出格式类似于：2025/05/18, 17:30:00

  return `[${timestamp
    .replace(/\//g, "-")
    .replace(",", "")}] ${level.toUpperCase()}: ${message}`;
}

module.exports = { formatLogEntry };
