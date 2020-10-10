drop table if exists user;
drop table if exists article;
drop table if exists article_vote;
drop table if exists comment;
drop table if exists comment_vote;

create table user (
  id text primary key not null,
  nickname text not null,
  avatar text not null
);

create table article (
  id text primary key not null,
  owner_id text not null,
  title text not null,
  description text not null,
  content text not null,
  created_at text not null,
  foreign key (owner_id)
    references user (id)
      on delete cascade
      on update cascade
);

-- CREATE TABLE user (
--   id TEXT PRIMARY KEY NOT NULL,
--   nickname TEXT NOT NULL,
--   email TEXT NOT NULL,
--   password TEXT NOT NULL,
--   registration_date TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL
-- );

-- CREATE TABLE article (
--   id TEXT PRIMARY KEY NOT NULL,
--   owner_id TEXT NOT NULL,
--   title TEXT NOT NULL,
--   subtitle TEXT NOT NULL,
--   content TEXT NOT NULL,
--   creation_date TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
--   FOREIGN KEY (owner_id)
--     REFERENCES user (id)
--       ON DELETE CASCADE
--       ON UPDATE CASCADE
-- );

-- CREATE TABLE article_vote (
--   article_id TEXT NOT NULL,
--   owner_id TEXT NOT NULL,
--   isLike NUMERIC NOT NULL,
--   PRIMARY KEY (article_id, owner_id),
--   FOREIGN KEY (article_id)
--     REFERENCES article (id)
--       ON DELETE CASCADE
--       ON UPDATE CASCADE,
--   FOREIGN KEY (owner_id)
--     REFERENCES user (id)
--       ON DELETE CASCADE
--       ON UPDATE CASCADE
-- );

-- CREATE TABLE comment (
--   id TEXT PRIMARY KEY NOT NULL,
--   article_id TEXT NOT NULL,
--   owner_id TEXT NOT NULL,
--   parent_comment_id TEXT DEFAULT NULL,
--   content TEXT NOT NULL,
--   creation_date TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
--   FOREIGN KEY (article_id)
--     REFERENCES article (id)
--       ON DELETE CASCADE
--       ON UPDATE CASCADE,
--   FOREIGN KEY (owner_id)
--     REFERENCES user (id)
--       ON DELETE CASCADE
--       ON UPDATE CASCADE,
--   FOREIGN KEY (parent_comment_id)
--     REFERENCES comment (id)
--       ON DELETE CASCADE
--       ON UPDATE CASCADE
-- );

-- CREATE TABLE comment_vote (
--   comment_id TEXT NOT NULL,
--   owner_id TEXT NOT NULL,
--   isLike NUMERIC NOT NULL,
--   PRIMARY KEY (comment_id, owner_id),
--   FOREIGN KEY (comment_id)
--     REFERENCES comment (id)
--       ON DELETE CASCADE
--       ON UPDATE CASCADE,
--   FOREIGN KEY (owner_id)
--     REFERENCES user (id)
--       ON DELETE CASCADE
--       ON UPDATE CASCADE
-- );
