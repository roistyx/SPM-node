const axios = require("axios");
const cheerio = require("cheerio");

const extractArticleMiddleware = async (req, res, next) => {
  const url = req.body.url;
  try {
    console.log("Loading article content...");
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    let articleContent = $("article").text();

    req.articleContent = articleContent;
    if (articleContent === "" || !articleContent) {
      console.log("No content");
      return res.status(500).json({ error: "Couldn't get article" });
    }

    articleContent = articleContent.replace(/\s+/g, " ").trim();
    // console.log("articleContent", articleContent);

    return res.status(200).json({ articleContent });
    // next();
    return;
  } catch (error) {
    console.error("Error:", error);
    console.log("Error in extractArticleMiddleware", error.message);
    return res.status(500).json({ error: "Couldn't get article" });
  }
};

module.exports = extractArticleMiddleware;
