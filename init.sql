CREATE TABLE IF NOT EXISTS products (
    ID SERIAL PRIMARY KEY,
    Name TEXT NOT NULL,
    Price FLOAT NOT NULL,
    Image TEXT NOT NULL,
    Seller_Name TEXT NOT NULL,
    Seller_Score INT NOT NULL,
    Seller_Feedback numeric(4,1) NOT NULL,
    Condition TEXT NOT NULL,
    Category TEXT NOT NULL
);
INSERT INTO products(
    Name,
    Price,
    Image,
    Seller_Name,
    Seller_Score,
    Seller_Feedback,
    Condition,
    Category
) VALUES (
    'Fantastic Frozen Salad',
    5364.87,
    'http://lorempixel.com/640/480',
    'Matilde.Lockman',
    3068,
    28.0,
    'sed',
    'Garden'
),(
    'Good Frozen Salad',
    534.87,
    'http://lorempixel.com/640/480',
    'Milde.Lockan',
    3068,
    28.0,
    'sed',
    'Garden'
);