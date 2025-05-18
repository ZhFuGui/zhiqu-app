const axios = require("axios");
const logger = require("../../logger/logger");

class Dify {
  constructor() {
    this.baseUrl = "https://api.dify.ai/v1/workflows/run";
    this.userId = "zhiqu-app";
  }

  async runWorkflow(apiKey, payload) {
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };

    const finalPayload = {
      ...payload,
      user: this.userId,
    };

    try {
      const response = await axios.post(this.baseUrl, finalPayload, {
        headers,
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? `Dify API error: ${error.response.status} - ${JSON.stringify(
            error.response.data
          )}`
        : `Request error: ${error.message}`;
      logger.error(errorMessage);
      return null;
    }
  }
}

module.exports = Dify;
