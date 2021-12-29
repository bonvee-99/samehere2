-- CREATE DATABASE samehere2;

CREATE extension IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
	user_id UUID DEFAULT uuid_generate_v4(),
	confirmed BOOLEAN NOT NULL DEFAULT FALSE,
	user_name VARCHAR(50) NOT NULL,
	user_email VARCHAR(50) NOT NULL UNIQUE,
	user_password VARCHAR(255) NOT NULL,
	post_time TIMESTAMP NOT NULL DEFAULT localtimestamp,
	PRIMARY KEY (user_id)
);

-- is deleted if its user is deleted
CREATE TABLE posts (
	post_id SERIAL,
	user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
	description VARCHAR(255) NOT NULL,
	post_time TIMESTAMP NOT NULL DEFAULT localtimestamp,
	PRIMARY KEY (post_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- comment. is delete when its post is deleted or if its user deletes it
CREATE TABLE comments (
	comm_id SERIAL,
	user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
	post_id INTEGER NOT NULL REFERENCES posts ON DELETE CASCADE,
	description VARCHAR(255) NOT NULL,
	post_time TIMESTAMP NOT NULL DEFAULT localtimestamp,
	PRIMARY KEY (comm_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (post_id) REFERENCES posts(post_id)
);


-- can get rid of foreign key at bottom because references implicitly says its a foreign key???


-- -- situation: test has 1 post and has 2 comments (one from test and one from don). Don follows test. Don sees his own post and also tests post and comments on that post
-- -- don also follows gavin who has no posts
-- -- fake user
-- insert into users (user_name, user_email, user_password) values ('test', 'test@gmail.com', 'testtest');
-- insert into users (user_name, user_email, user_password) values ('don', 'don@gmail.com', 'testtest');
-- insert into users (user_name, user_email, user_password) values ('gavin', 'gavin@gmail.com', 'gavin');
-- -- fake post
-- insert into posts (user_id, description) values ('4c1dbce1-42a2-485d-b48b-bfc17001c863', 'tests second post');
-- insert into posts (user_id, description) values ('5bbb83f9-283f-4724-b58a-c8d1504d5ef5', 'dons post');
-- -- fake comment
-- insert into comments (user_id, post_id, description) values ('4c1dbce1-42a2-485d-b48b-bfc17001c863', 1, 'tests comment on tests post');
-- insert into comments (user_id, post_id, description) values ('5bbb83f9-283f-4724-b58a-c8d1504d5ef5', 1, 'dons comment on tests own post');
-- -- fake follow
-- -- insert into follows (user_id, follow_id) values ('ca3ad58c-5f88-4a34-be97-79c2df2220d1', '37ec442f-300b-45de-9a71-61520799bd18');
-- -- insert into follows (user_id, follow_id) values ('ca3ad58c-5f88-4a34-be97-79c2df2220d1', '85c7040f-6f0f-4fd7-b7b1-7363e50acb90');
