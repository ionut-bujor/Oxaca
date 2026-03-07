/* INSERT INTO menu_type (name)
VALUES
    ('Starters'),
    ('Mains'),
    ('Drinks');

INSERT INTO item_group (name, menu_type_id)
VALUES
    ('Oaxacan Specialties', 1),
    ('Seafood Starters', 1),
    ('Classic Mains', 2),
    ('Beverages', 3);

INSERT INTO menu_item
(item_name, item_description, item_quantity, item_price, item_image_url, item_group_id, calories)
VALUES
    ('Oaxacan Black Mole',
     'Authentic black mole with 32 ingredients, served with chicken breast and handmade tortillas.',
     50, 100.00,',
     1, 450),

    ('Tlayuda Tradicional',
     'Crispy giant tortilla spread with asiento, beans, tasajo, and Oaxacan cheese.',
     45, 40.50,
     'https://static.wixstatic.com/media/5a9b3b_ec99f3c71ecc4e1496b1288dd9ded9f1~mv2.jpg/v1/fill/w_3492,h_2328,al_c,q_90/5a9b3b_ec99f3c71ecc4e1496b1288dd9ded9f1~mv2.webp',
     1, 620),

    ('Pacific Coast Ceviche',
     'Fresh daily catch marinated in lime, serrano peppers, cilantro, and red onions.',
     40, 16.00,
     'https://lh3.googleusercontent.com/aida-public/AB6AXuB8lQnm7LHMRuPksoLmTV318TScvV3er7Ms3NAn6moWNdqPeVVsXuk3hGsi4iEbH1LuXvMTdIvg92Wh0aarrkxPhVCAx1H39VYZac1jKXHSV9XKt1i4Z9VgwpkOUd2iN5KrpEjjybCh-s6H2VOGZgaeABKeGQ-it6xnfDu6gY_9MPh6XyVocTnLC756KStl-EKb2OmcaKneJaGwbLxAwgxTYeev1gUtJogWKgfwuaD14t073KKnxl6nNQtkch_TEhBH7YhcRWdiQfk',
     2, 210),

    ('Red Snapper Veracruz',
     'Pan-seared snapper with tomatoes, olives, capers, and aromatic herbs.',
     35, 32.00,
     'https://mission-food.com/wp-content/uploads/2022/06/Pescado-a-la-Veracruzana-Veracruz-Style-Fish-13.jpg',
     3, 380),

    ('Mezcal Margarita',
     'Espadín mezcal, fresh lime, agave nectar, and a sal de gusano rim.',
     100, 14.00,
     'https://thesageapron.com/wp-content/uploads/2022/05/Spicy-Marg-6.jpg',
     4, 165);

INSERT INTO menu_item_tags (menu_item_id, tag)
VALUES
    (1, 'GLUTEN_FREE'),
    (2, 'VEGETARIAN'),
    (3, 'GLUTEN_FREE'),
    (3, 'SPICY'),
    (4, 'GLUTEN_FREE');

INSERT INTO menu_item_allergens (menu_item_id, allergens)
VALUES
    (1, 'NUTS'),
    (1, 'SESAME'),
    (2, 'DAIRY'),
    (2, 'GLUTEN'),
    (3, 'SHELLFISH'),
    (4, 'FISH'),
    (5, 'DAIRY');

INSERT INTO users (email, password_hash, role, first_name, last_name)
VALUES (
           'admin@oaxaca.com',
           '$2a$10$mYY0PtF7uw3Fb5pv5WB5ou6e8wsY.ZAOoRcGPivLINUJ92C5pzLd2',
           'ADMIN',
           'John',
           'Smith'
       );
*/


-- Customer orders for the admin
--INSERT INTO customer_order (id, table_number, status, paid, created_at, user_id) VALUES
--(1, 5, 'DELIVERED', false, NOW(), 1),
--(2, 6, 'DELIVERED', true, NOW(), 1),
--(3, 7, 'PREPARING', false, NOW(), 1);

--INSERT INTO users (email, password_hash, role, first_name, last_name)
--VALUES (
 --          'waiter@oaxaca.com',
 --          '$2a$10$mYY0PtF7uw3Fb5pv5WB5ou6e8wsY.ZAOoRcGPivLINUJ92C5pzLd2',
   --        'WAITER',
     --      'John',
       --    'Smith'
       --);
-- 1. Ensure a user exists (the CustomerOrder requires a user_id)
INSERT INTO users (id, email, password_hash, role, first_name, last_name)
VALUES (1, 'test@oaxaca.com', '$2a$10$dummyhashvalue12345678901234567890123456789012', 'CUSTOMER', 'John', 'Doe')
    ON CONFLICT (id) DO NOTHING;

-- 2. Ensure item groups exist (MenuItem requires item_group_id)
INSERT INTO menu_type (id, name) VALUES (1, 'Main Menu') ON CONFLICT DO NOTHING;

INSERT INTO item_group (id, menu_type_id, name) VALUES (1, 1, 'Classic Mains') ON CONFLICT DO NOTHING;
INSERT INTO item_group (id, menu_type_id, name) VALUES (2, 1, 'Oaxacan Specialties') ON CONFLICT DO NOTHING;
INSERT INTO item_group (id, menu_type_id, name) VALUES (3, 1, 'Beverages') ON CONFLICT DO NOTHING;

-- 3. Insert menu items
INSERT INTO menu_item (id, item_name, item_description, item_quantity, item_price, item_image_url, calories, item_group_id)
VALUES
    (1, 'Mole Poblano',      'Rich dark mole sauce over tender chicken', 10, 14.50, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600', 620, 1),
    (2, 'Guacamole & Chips', 'Fresh avocado, lime, coriander',           10,  6.00, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600', 310, 2),
    (3, 'Horchata',          'Traditional rice milk drink',              10,  4.00, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600', 180, 3),
    (4, 'Tacos al Pastor',   'Marinated pork tacos with pineapple',      10,  9.00, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600', 540, 1),
    (5, 'Agua Fresca',       'Hibiscus flower cold drink',               10,  3.75, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600', 120, 3),
    (6, 'Ceviche Tostada',   'Fresh ceviche on a crispy tostada',        10, 11.50, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600', 290, 2)
    ON CONFLICT (id) DO NOTHING;

-- 4. Insert the 3 orders (matching frontend mock IDs)
INSERT INTO customer_order (id, table_number, status, paid, created_at, user_id)
VALUES
    (1, 5, 'PLACED',    false, NOW(),                        1),
    (2, 3, 'PREPARING', false, NOW() - INTERVAL '15 minutes', 1),
    (3, 8, 'READY',     false, NOW() - INTERVAL '30 minutes', 1)
    ON CONFLICT (id) DO NOTHING;

-- 5. Link menu items to orders
UPDATE menu_item SET customer_order_id = 1, item_quantity = 2 WHERE id = 1; -- Mole Poblano x2
UPDATE menu_item SET customer_order_id = 1, item_quantity = 1 WHERE id = 2; -- Guacamole x1
UPDATE menu_item SET customer_order_id = 1, item_quantity = 2 WHERE id = 3; -- Horchata x2

UPDATE menu_item SET customer_order_id = 2, item_quantity = 3 WHERE id = 4; -- Tacos x3
UPDATE menu_item SET customer_order_id = 2, item_quantity = 1 WHERE id = 5; -- Agua Fresca x1

UPDATE menu_item SET customer_order_id = 3, item_quantity = 2 WHERE id = 6; -- Ceviche x2

-- 6. Reset sequences so future inserts don't clash
SELECT setval('users_id_seq',      (SELECT MAX(id) FROM users));
SELECT setval('menu_item_id_seq',   (SELECT MAX(id) FROM menu_item));
SELECT setval('customer_order_id_seq', (SELECT MAX(id) FROM customer_order));
SELECT setval('item_group_id_seq',  (SELECT MAX(id) FROM item_group));
SELECT setval('menu_type_id_seq',   (SELECT MAX(id) FROM menu_type));
