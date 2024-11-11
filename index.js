const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());

app.get("/all-articles-list", async (_, res) => {
  try {
    const allArticles = await pool.query(
      "SELECT Articles.article_id, Articles.title, Author.name AS author_name FROM Articles JOIN Author ON Articles.author_id = Author.author_id;"
    );
    res.json(allArticles.rows);
  } catch (err) {
    console.log("Error Occured when /all-articles-list route was called");
    console.log(err);

    res.status(500).json({
      Error: "An Error Occured when retrieving all articles",
      ErrorCallback: err,
    });
  }
});

app.get("/articles/:id", async (req, res) => {
  console.log("This route is running!");
  const articleId = req.params.id;

  try {
    const article = await pool.query(
      `SELECT Articles.title, Articles.content, Author.name AS author_name, Author.tagline, Author.email FROM Articles JOIN Author ON Articles.author_id = Author.author_id WHERE article_id = ${articleId};`
    );

    res.json(article.rows);
  } catch (err) {
    console.log("An error occured when getting an article");
    console.log(err);

    res.status(500).json({
      Error: "An error occured when trying to retrieve this article",
      ErrorCallback: err,
    });
  }
});

app.get("/", async (_, res) => {
  try {
    res.json({
      Message: "Hello!",
    });
  } catch (err) {
    console.log("Error Occured when / route was called");
    console.log(err);

    res.status(500).json({
      Error: "An Error Occured, this is not your fault.",
      ErrorCallback: err,
    });
  }
});

app.listen(5000, () => {
  console.log("The server has started");
});
