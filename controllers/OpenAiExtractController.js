const { Configuration, OpenAIApi } = require("openai");

class OpenAiExtractController {
  static async ExtractOpenAi(req, res) {
    console.log("Summarizing article content...");

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    try {
      const openai = new OpenAIApi(configuration);
      console.log(req.articleContent);

      // const response = await openai.createCompletion({
      //   model: "text-davinci-003",
      //   prompt: `Remove programming language code from ${req.articleContent}`,
      //   temperature: 1,
      //   max_tokens: 256,
      //   top_p: 1,
      //   frequency_penalty: 0,
      //   presence_penalty: 0,
      // });

      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: `Summarize to an 8th grader level ${req.articleContent}`,
          },
        ],
      });
      console.log(response.data.choices[0].text);
      return res.status(200).json({ text: response.data.choices[0].text });
      //   return;
    } catch (error) {
      console.error("Error in OpenAI request:", error.message);
    }
  }
}

module.exports = OpenAiExtractController;
