CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username text UNIQUE NOT NULL,
    firstname  VARCHAR(150) NOT NULL,
    lastname VARCHAR(150) NOT NULL ,
    password_digest VARCHAR(255) NOT NULL, 
    email VARCHAR(150) UNIQUE,
    user_role VARCHAR(30)
);