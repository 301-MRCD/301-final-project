DROP TABLE IF EXISTS poketable;

CREATE TABLE poketable(
    id SERIAL PRIMARY KEY,
    name VARCHAR (255),
    url VARCHAR (255)
);