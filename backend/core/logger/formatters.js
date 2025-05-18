function formatLogEntry(level, message) {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
}

module.exports = { formatLogEntry };