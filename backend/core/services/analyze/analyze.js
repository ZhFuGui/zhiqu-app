const axios = require("axios");
const logger = require("../../logger/logger");
const Dify = require("../public/dify");

const dify = new Dify();

class Analyze {
  constructor() {
    this.apiKey = process.env.DIFY_API_KEY;

    if (!this.apiKey) {
      logger.error("DIFY_API_KEY is not set");
      throw new Error("DIFY_API_KEY is not set");
    }
  }

  async preference(history) {
    payload = {
      inputs: {
        history: history,
        direction: "内容偏好分析",
      },
      response_mode: "blocking",
    };

    const result = await dify.runWorkflow_blocking(this.apiKey, payload);
    console.log("result", result);
    return result;
  }
}

module.exports = Analyze;
