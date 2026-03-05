-- menu_type: unique on name
INSERT INTO menu_type (name)
VALUES
    ('Starters'),
    ('Mains'),
    ('Drinks')
ON CONFLICT (name) DO NOTHING;

-- item_group: unique on name
INSERT INTO item_group (name, menu_type_id)
VALUES
    ('Oaxacan Specialties', 1),
    ('Seafood Starters', 1),
    ('Classic Mains', 2),
    ('Beverages', 3)
ON CONFLICT (name) DO NOTHING;

-- menu_item: unique on item_name
INSERT INTO menu_item
(item_name, item_description, item_quantity, item_price, item_image_url, item_group_id, calories)
VALUES
    ('Oaxacan Black Mole', 'Authentic black mole with 32 ingredients, served with chicken breast and handmade tortillas.', 50, 100.00, '', 1, 450),
    ('Tlayuda Tradicional', 'Crispy giant tortilla spread with asiento, beans, tasajo, and Oaxacan cheese.', 45, 40.50, 'https://static.wixstatic.com/media/...', 1, 620),
    ('Pacific Coast Ceviche', 'Fresh daily catch marinated in lime, serrano peppers, cilantro, and red onions.', 40, 16.00, 'https://...', 2, 210),
    ('Red Snapper Veracruz', 'Pan-seared snapper with tomatoes, olives, capers, and aromatic herbs.', 35, 32.00, 'https://...', 3, 380),
    ('Mezcal Margarita', 'Espadín mezcal, fresh lime, agave nectar, and a sal de gusano rim.', 100, 14.00, 'https://...', 4, 165)
ON CONFLICT (item_name) DO NOTHING;

-- tags: unique on (menu_item_id, tag)
INSERT INTO menu_item_tags (menu_item_id, tag)
VALUES
    (1, 'GLUTEN_FREE'),
    (2, 'VEGETARIAN'),
    (3, 'GLUTEN_FREE'),
    (3, 'SPICY'),
    (4, 'GLUTEN_FREE')
ON CONFLICT (menu_item_id, tag) DO NOTHING;

-- allergens: unique on (menu_item_id, allergens)
INSERT INTO menu_item_allergens (menu_item_id, allergens)
VALUES
    (1, 'NUTS'),
    (1, 'SESAME'),
    (2, 'DAIRY'),
    (2, 'GLUTEN'),
    (3, 'SHELLFISH'),
    (4, 'FISH'),
    (5, 'DAIRY')
ON CONFLICT (menu_item_id, allergens) DO NOTHING;

-- users: unique on email
INSERT INTO users (email, password_hash, role, first_name, last_name)
VALUES ('admin@oaxaca.com', '$2a$10$mYY0PtF7uw3Fb5pv5WB5ou6e8wsY.ZAOoRcGPivLINUJ92C5pzLd2', 'ADMIN', 'John', 'Smith')
ON CONFLICT (email) DO NOTHING;

INSERT INTO users (email, password_hash, role, first_name, last_name)
VALUES ('waiter@oaxaca.com', '$2a$10$mYY0PtF7uw3Fb5pv5WB5ou6e8wsY.ZAOoRcGPivLINUJ92C5pzLd2', 'ADMIN', 'Maria', 'Garcia')
ON CONFLICT (email) DO NOTHING;

-- customer_order: unique on id (primary key)
INSERT INTO customer_order (id, table_number, status, paid, created_at, user_id) VALUES
(1, 5, 'DELIVERED', false, NOW(), 1),
(2, 6, 'DELIVERED', true, NOW(), 1),
(3, 7, 'PREPARING', false, NOW(), 1)
ON CONFLICT (id) DO NOTHING;