DROP TABLE IF EXISTS parks;

CREATE TABLE parks(
    id SERIAL PRIMARY KEY,
    yelp_id VARCHAR (255),
    total_ratings VARCHAR (255),
    total_votes VARCHAR(255)
);