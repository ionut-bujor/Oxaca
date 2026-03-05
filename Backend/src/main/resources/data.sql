INSERT INTO menu_type (name)
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
     50, 100.00,
     'https://lh3.googleusercontent.com/aida-public/AB6AXuC7J15XCZfi0FBwpfXmEmtumAkVxVIJheynRAlmFEyRPWMc8eKH8xAXfL5L-vscbF5iwonbjv4hPTu3BzffptERUaQWZiI8wUW2zwxgylCcNMzB7YpgtlQgxicLxTh706NmSc2811RVmsRcLLzA4ng8hSPDLkSOqwJWtsphfvS_SgbqcTYPTb7vBnE8FD-mm4HgXt3WdnU1zNZ2WfXARa_uUpkorCewwaVlHBM8D-5QhCfiysIwCzz_fNjSGqxyJfQ-b9yrqp49urg',
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

INSERT INTO users (email, password_hash, role, first_name, last_name)
VALUES (
           'waiter@oaxaca.com',
           '$2a$10$mYY0PtF7uw3Fb5pv5WB5ou6e8wsY.ZAOoRcGPivLINUJ92C5pzLd2',
           'ADMIN',
           'Maria',
           'Garcia'
       );


-- Customer orders for the admin
INSERT INTO customer_order (id, table_number, status, paid, created_at, user_id) VALUES
(1, 5, 'DELIVERED', false, NOW(), 1),
(2, 6, 'DELIVERED', true, NOW(), 1),
(3, 7, 'PREPARING', false, NOW(), 1);
