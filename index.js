const express = require("express");
const app = express();
const pool = require("./db");
const compression = require("compression");
var cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(compression());

app.get("/dynamiccontent/:id", async (req, res) => {
  const dynamiccontent_id = req.params.id;

  try {
    const dynamicContent = await pool.query(
      `
SELECT * FROM DynamicContent
WHERE content_id = $1;
      `,
      [dynamiccontent_id]
    );

    if (dynamicContent.rows.length == 0) {
      res.status(404).json({
        Error: "Could not find the dynamic content",
      });
    } else {
      res.json(dynamicContent.rows);
    }
  } catch (err) {
    console.log("An error occured when getting the dynamic content");
    console.log(err);

    res.status(500).json({
      Error: "An error occured when trying to retrieve this dynamic content",
      ErrorCallback: err,
    });
  }
});

app.get("/articles/featured/", async (req, res) => {
  try {
    const featuredArticles = await pool.query(
      `
SELECT
   Articles.article_id,
   Articles.title,
   Articles.image_url,
   Articles.public,
   Author.name AS author_name,
   FeaturedArticles.featured_id
FROM 
   FeaturedArticles
JOIN 
   Articles ON FeaturedArticles.article_id = Articles.article_id
JOIN 
   Author ON Articles.author_id = Author.author_id
      `
    );
    res.json(featuredArticles.rows);
  } catch (err) {
    console.log("Error Occured when /articles/featured route was called");
    console.log(err);

    res.status(500).json({
      Error: "An Error Occured when retrieving featured articles",
      ErrorCallback: err,
    });
  }
});

app.get("/articles/all", async (_, res) => {
  try {
    const allArticles = await pool.query(
      `
SELECT
  Articles.article_id,
  Articles.title,
  Author.name AS author_name,
  Articles.image_url,
  Articles.public,
  Articles.published_date
FROM
  Articles
JOIN 
  Author ON Articles.author_id = Author.author_id
ORDER BY
  Articles.title ASC;
`
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
  const articleId = req.params.id;

  try {
    const article = await pool.query(
      `
      SELECT
        Articles.title,
        Articles.content, 
        Articles.image_url, 
        Articles.public,
        Articles.published_date,
        Author.name AS author_name, 
        Author.tagline, 
        Author.email
      FROM
        Articles
      JOIN
        Author ON Articles.author_id = Author.author_id
      WHERE
        article_id = $1;
      `,
      [articleId]
    );

    if (article.rows.length == 0) {
      res.status(404).json({
        Error: "Could not find the article",
      });
    } else {
      res.json(article.rows);
    }
  } catch (err) {
    console.log("An error occured when getting an article");
    console.log(err);

    res.status(500).json({
      Error: "An error occured when trying to retrieve this article",
      ErrorCallback: err,
    });
  }
});

app.get("/author/:id", async (req, res) => {
  const authorId = req.params.id;

  try {
    const author = await pool.query(
      `
SELECT name, tagline, email FROM Author
WHERE author_id = $1;   
      `,
      [authorId]
    );

    if (author.rows.length == 0) {
      res.status(404).json({
        Error: "Could not find the author",
      });
    } else {
      res.json(author.rows);
    }
  } catch (err) {
    res.status(500).json({
      Error: "An error occured when trying to retrieve this author",
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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`The server has started on port ${PORT}`);
});
