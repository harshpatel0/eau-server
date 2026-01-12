# EAU Server
EAU Website REST API and Database Connections 

Uses Express.js and PostgreSQL.

erDiagram
    author ||--o{ articles : "writes"
    articles ||--o| featuredarticles : "is highlighted in"
    
    author {
        int author_id PK
        string name
        text tagline
        string email
    }
    articles {
        int article_id PK
        string title
        int author_id FK
        text content
        string image_url
        varchar public
        timestamp published_date
    }
    featuredarticles {
        int featured_id PK
        int article_id FK
    }
    dynamiccontent {
        string content_id PK
        text content
    }
