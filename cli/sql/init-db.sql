DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS article_vote;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS comment_vote;

CREATE TABLE user (
  id TEXT PRIMARY KEY NOT NULL,
  nickname TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  registration_date TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE article (
  id TEXT PRIMARY KEY NOT NULL,
  owner_id TEXT NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  content TEXT NOT NULL,
  creation_date TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (owner_id)
    REFERENCES user (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

CREATE TABLE article_vote (
  article_id TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  isLike NUMERIC NOT NULL,
  PRIMARY KEY (article_id, owner_id),
  FOREIGN KEY (article_id)
    REFERENCES article (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  FOREIGN KEY (owner_id)
    REFERENCES user (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

CREATE TABLE comment (
  id TEXT PRIMARY KEY NOT NULL,
  article_id TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  parent_comment_id TEXT DEFAULT NULL,
  content TEXT NOT NULL,
  creation_date TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (article_id)
    REFERENCES article (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  FOREIGN KEY (owner_id)
    REFERENCES user (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  FOREIGN KEY (parent_comment_id)
    REFERENCES comment (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

CREATE TABLE comment_vote (
  comment_id TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  isLike NUMERIC NOT NULL,
  PRIMARY KEY (comment_id, owner_id),
  FOREIGN KEY (comment_id)
    REFERENCES comment (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  FOREIGN KEY (owner_id)
    REFERENCES user (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);
