/* Replace with your SQL commands */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(64) UNIQUE NOT NULL ,
    lastName VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL
);
