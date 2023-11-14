// Purpose: OpenAiInquiryController handles all requests that are related to OpenAiInquiry.

const { Configuration, OpenAIApi } = require("openai");
const readline = require("readline");

class OpenAiPromptController {
  static async PromptLine(req, res) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.prompt();
    rl.on("line", async (input) => {
      const openai = new OpenAIApi(configuration);
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: input,
          },
        ],
      });
      console.log(response.data.choices[0].message.content);
      rl.prompt();
    });
  }
}

module.exports = OpenAiPromptController;
