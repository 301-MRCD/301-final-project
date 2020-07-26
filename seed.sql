INSERT INTO parks_table 
    (yelp_id, park_name, total_ratings, total_votes) 
        VALUES('e4bvpvVlLH52BRMLP1iHKg', 'Woodland Park Off Leash Area',  '20', '5')
         RETURNING *;

