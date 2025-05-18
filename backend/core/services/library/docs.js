const fs = require('fs').promises;
const path = require('path');
const logger = require('../../logger/logger');

class DocsService {
    constructor() {
        this.filePath = path.join(__dirname, '../../../storage/static', 'example.json');
    }

    async readJsonFile() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            const jsonData = JSON.parse(data);
            return { data: jsonData };
        } catch (err) {
            const errorMessage = err instanceof SyntaxError 
                ? `JSON 解析错误: ${err.message}`
                : `读取文件 ${this.filePath} 失败: ${err.message}`;
            await logger.error(errorMessage);
            return { error: errorMessage };
        }
    }
}

module.exports = DocsService;