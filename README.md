# EAU Server
EAU Website REST API and Database Connections 
Uses Express.js and PostgreSQL.

## Database Schema

### Authors `author` table
This table stores details about article authors

| Column    | Type         | Constraints | Description                                |
| --------- | ------------ | ----------- | ------------------------------------------ |
| author_id | SERIAL       | PRIMARY KEY | Unique identifier for the author.          |
| name      | VARCHAR(255) | NOT NULL    | Display name of the writer.                |
| tagline   | TEXT         |             | Personal bio (appears on article footers). |
| email     | VARCHAR(255) |             | Contact email (optional).                  |


### Articles `articles` table
This table stores details about the article

| Column         | Type         | Constraints   | Description                                                                 |
| -------------- | ------------ | ------------- | --------------------------------------------------------------------------- |
| article_id     | SERIAL       | PRIMARY KEY   | Unique identifier for the article.                                          |
| title          | VARCHAR(255) | NOT NULL      | Article headline.                                                           |
| author_id      | INTEGER      | FK (author)   | Links the article to its creator.                                           |
| content        | TEXT         |               | Markdown formatted body text.                                               |
| image_url      | TEXT         |               | Path to the article's banner/preview image.                                 |
| public         | VARCHAR(1)   | DEFAULT '1'   | '1' for public, '0' for unlisted. I wonder why I used varchar tho           |
| published_date | TIMESTAMP    | DEFAULT NOW() | Date and time of publication.                                               |

#### Special Articles
There are special articles, which have their link hard coded into the site.

Article `4` is a special article, the link is hardcoded into the site at the Club Activities section.

### Dynamic Content `dynamiccontent` table
This table is used for sections that need to change often but don't need a full site rewrite

| Column     | Type         | Constraints | Description                 |
| ---------- | ------------ | ----------- | --------------------------- |
| content_id | VARCHAR(100) | PRIMARY KEY | Specific ID for the content |
| content    | TEXT         |             | Markdown formatted content. |


`frontpage_feature` is used to display the Message of the Day on the front page, in Markdown Format
`quotes` is used to display quotes on the front page, in JSON format.
`featured_articles_title` is used on The Union Dispatch header to change the title of the Featured Articles section
`featured_articles_subtext` is the text that went underneath the Featured Articles title.

`quotes` is a JSON array of objects, containing a `quote` and a `caption` key.

``` json
  [
    {
        quote: `What do you call an aligator in a vest...`,
        caption: "...An Investigator 🥁🥁🥁",
    },
  ]
```
### Featured Articles `featuredarticles` Table
This table is used to highlight articles at the front of The Union Dispatch.

| Column      | Type    | Constraints   | Description                       |
| ----------- | ------- | ------------- | --------------------------------- |
| featured_id | SERIAL  | PRIMARY KEY   | Unique ID for the featured entry. |
| article_id  | INTEGER | FK (articles) | The article to be highlighted.    |

