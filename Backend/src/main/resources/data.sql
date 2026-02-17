INSERT INTO menu_type (name)
VALUES
    ('Main'),
    ('Drinks'),
    ('Desserts'),
    ('Starters');

INSERT INTO item_group (name, menu_type_id)
VALUES
    ('Chicken Dishes', 1),
    ('Pasta', 1),
    ('Soft Drinks', 2),
    ('Cakes', 3),
    ('Seafood Starters', 4);

INSERT INTO menu_item
(item_name, item_description, item_quantity, item_price, item_image_url, item_group_id, calories)
VALUES
    ('Grilled Chicken',
     'Juicy grilled chicken breast with herbs',
     50, 14.99,
     'images/grilled_chicken.jpg',
     1, 650),

    ('Spaghetti Carbonara',
     'Classic pasta with creamy sauce and bacon',
     40, 12.50,
     'images/carbonara.jpg',
     2, 850),

    ('Cola',
     'Chilled fizzy soft drink',
     100, 3.00,
     'images/cola.jpg',
     3, 150),

    ('Chocolate Cake',
     'Rich chocolate cake with ganache',
     20, 6.75,
     'images/chocolate_cake.jpg',
     4, 500),

    ('Garlic Prawns',
     'Pan-fried prawns with garlic butter',
     30, 9.99,
     'images/garlic_prawns.jpg',
     5, 400);

INSERT INTO menu_item_tags (menu_item_id, tag)
VALUES
    (1, 'GLUTEN_FREE'),
    (3, 'VEGAN'),
    (3, 'VEGETARIAN'),
    (4, 'VEGETARIAN'),
    (5, 'SPICY');

INSERT INTO menu_item_allergens (menu_item_id, allergens)
VALUES
    (2, 'DAIRY'),
    (2, 'GLUTEN'),
    (4, 'DAIRY'),
    (4, 'GLUTEN'),
    (5, 'SHELLFISH'),
    (5, 'DAIRY');

INSERT INTO users (email, password_hash, role)
VALUES (
           'admin@oaxaca.com',
           '$2a$10$mYY0PtF7uw3Fb5pv5WB5ou6e8wsY.ZAOoRcGPivLINUJ92C5pzLd2',
           'ADMIN'
       );
