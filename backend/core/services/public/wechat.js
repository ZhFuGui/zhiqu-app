require("dotenv").config({
  path: path.resolve(__dirname, "../../../../../.env"),
});
const axios = require("axios");
const logger = require("../logger/logger");

class Wechat {
  constructor() {
    this.appId = process.env.WX_APP_ID;
    this.appSecret = process.env.WX_APP_SECRET;

    if (!this.appId || !this.appSecret) {
      throw new Error(
        "Wechat class requires WX_APP_ID and WX_APP_SECRET environment variables"
      );
    }

    // 创建自定义 axios 实例
    this.wxApiClient = axios.create({
      baseURL: "https://api.weixin.qq.com",
      timeout: 5000, 
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * 将微信小程序的 code 转换为 openid（或 unionid）
   * @param {string} code - 微信小程序登录返回的 code
   * @returns {Promise<string>} - 返回 openid（或 unionid 如果可用）
   * @throws {Error} - 无效 code、API 错误或其他异常
   */
  async codeToOpenId(code) {
    if (!code || typeof code !== "string") {
      logger.error("Invalid code provided for WeChat login");
      throw new Error("Invalid code");
    }

    try {
      logger.debug("Requesting WeChat jscode2session API");
      const response = await this.wxApiClient.get("/sns/jscode2session", {
        params: {
          appid: this.appId,
          secret: this.appSecret,
          js_code: code,
          grant_type: "authorization_code",
        },
      });

      const { openid, unionid, session_key, errcode, errmsg } = response.data;

      // 检查 API 错误
      if (errcode) {
        const errorMessages = {
          40029: "Invalid code",
          45011: "API frequency limit reached",
          40226: "User banned",
          "-1": "System busy",
        };
        const message = errorMessages[errcode] || `WeChat API error: ${errmsg}`;
        logger.error(`WeChat API failed: code=${errcode}, message=${message}`);
        throw new Error(message);
      }

      // 确保 openid 存在
      if (!openid) {
        logger.warn("No openid returned from WeChat API");
        throw new Error("Failed to retrieve openid");
      }

      // 返回 openid
      const userId = openid;
      logger.info(`Successfully retrieved user ID: ${userId}`);

      return userId;
    } catch (error) {
      logger.error(`codeToOpenId failed: ${error.message}`);
      throw error instanceof Error ? error : new Error("WeChat login failed");
    }
  }


}

module.exports = Wechat;
