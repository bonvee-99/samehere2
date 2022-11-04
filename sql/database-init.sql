-- CREATE DATABASE samehere2;

CREATE extension IF NOT EXISTS "uuid-ossp";

-- users
CREATE TABLE IF NOT EXISTS users (
	user_id UUID DEFAULT uuid_generate_v4(),
	confirmed BOOLEAN NOT NULL DEFAULT FALSE,
	user_name VARCHAR(50) NOT NULL,
	user_email VARCHAR(50) NOT NULL UNIQUE,
	user_password VARCHAR(255) NOT NULL,
	post_time TIMESTAMP NOT NULL DEFAULT localtimestamp,
	PRIMARY KEY (user_id)
);

-- posts *:1 user
CREATE TABLE IF NOT EXISTS posts (
	post_id SERIAL,
	user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
	description VARCHAR(255) NOT NULL,
	post_time TIMESTAMP NOT NULL DEFAULT localtimestamp,
	PRIMARY KEY (post_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- comments *:1 post
CREATE TABLE IF NOT EXISTS comments (
	comm_id SERIAL,
	user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
	post_id INTEGER NOT NULL REFERENCES posts ON DELETE CASCADE,
	description VARCHAR(255) NOT NULL,
	post_time TIMESTAMP NOT NULL DEFAULT localtimestamp,
	PRIMARY KEY (comm_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (post_id) REFERENCES posts(post_id)
);
