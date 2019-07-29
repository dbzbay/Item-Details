CREATE TABLE IF NOT EXISTS dbzbay.products (
    uid timeuuid,
    ID INT,
    Name TEXT,
    Price DECIMAL,
    Image TEXT,
    Seller_Name TEXT,
    Seller_Score INT,
    Seller_Feedback DECIMAL,
    Condition TEXT,
    Category TEXT,
    PRIMARY KEY (uid)
);
INSERT INTO products(
    uid,
    ID,
    Name,
    Price,
    Image,
    Seller_Name,
    Seller_Score,
    Seller_Feedback,
    Condition,
    Category
) VALUES (
    now(),
    1,
    'Fantastic Frozen Salad',
    5364.87,
    'http://lorempixel.com/640/480',
    'Matilde.Lockman',
    3068,
    28.0,
    'sed',
    'Garden'
);
INSERT INTO products(
    uid,
    ID,
    Name,
    Price,
    Image,
    Seller_Name,
    Seller_Score,
    Seller_Feedback,
    Condition,
    Category
) VALUES (
    now(),
    2,
    'Good Frozen Salad',
    534.87,
    'http://lorempixel.com/640/480',
    'Milde.Lockan',
    3068,
    28.0,
    'sed',
    'Garden'
);