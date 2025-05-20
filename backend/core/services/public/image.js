// imageService.js
const fs = require('fs');
const path = require('path');

/**
 * 获取图片的服务方法
 * @param {string} imagePath - 图片在服务器上的相对路径
 * @returns {Promise<{stream: fs.ReadStream, mimeType: string}> | Error}
 */
function getImage(imagePath) {
    const imgPath = path.join(__dirname, '../../../../storage/images', imagePath); // 确保这里的路径指向你的图片位置
    
    return new Promise((resolve, reject) => {
        
        fs.access(imgPath, fs.constants.F_OK, (err) => {
            if (err) {
                reject(new Error('图片未找到'));
                return;
            }

            const mimeType = getMimeTypeByExtension(path.extname(imagePath).toLowerCase());
            const readStream = fs.createReadStream(imgPath);
            
            resolve({ stream: readStream, mimeType });
        });
    });
}

/**
 * 根据文件扩展名确定MIME类型
 * @param {string} ext - 文件扩展名（包含点号）
 * @returns {string} MIME类型
 */
function getMimeTypeByExtension(ext) {
    switch (ext) {
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.gif':
            return 'image/gif';
        default:
            return 'application/octet-stream'; // 默认类型
    }
}

module.exports = { getImage };