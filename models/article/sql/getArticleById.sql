select
  a.id,
  a.title,
  a.description,
  a.created_at,
  a.content,
  u.id as author_id,
  u.nickname as author_nickname,
  u.avatar as author_avatar
from article as a
  inner join user as u on a.author_id = u.id
where a.id = ?;
