DROP TABLE IF EXISTS customer_order_item;
DROP TABLE IF EXISTS customer_order;
DROP TABLE IF EXISTS menu_item;
DROP TABLE IF EXISTS item_group;
DROP TABLE IF EXISTS menu_type;
DROP TABLE IF EXISTS users;


DROP TYPE IF EXISTS allergens;
DROP TYPE IF EXISTS dietary_tag;
DROP TYPE IF EXISTS role;


-- determines which menu is being shown (main, drinks, desserts, starters)
CREATE TABLE menu_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE
);

-- subcategories within a menu (chicken, dishes)
CREATE TABLE item_group(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    menu_type_id INT NOT NULL,
    FOREIGN KEY (menu_type_id) REFERENCES menu_type(id)
);

CREATE TYPE dietary_tag AS ENUM ('Vegan', 'Gluten-Free', 'Spicy', 'Vegetarian');
CREATE TYPE allergens AS ENUM ('Dairy', 'Nuts', 'Gluten', 'Fish', 'Shellfish', 'Soy','Sesame');


-- User roles enum
CREATE TYPE user_role AS ENUM ('CUSTOMER', 'WAITER', 'KITCHEN_STAFF');

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL
);

-- the actual items (prawns, carbonara, etc.)
CREATE TABLE menu_item (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(30) NOT NULL,
    item_description VARCHAR(100) NOT NULL,
    item_quantity int NOT NULL,
    item_price NUMERIC(10,2) NOT NULL,
    item_image_url TEXT NOT NULL,
    item_group_id INT NOT NULL,
    calories INT,
    tags dietary_tag[] DEFAULT '{}', -- by default this is empty unless specified when inputting the values.
    allergens allergens[] DEFAULT '{}',
    FOREIGN KEY (item_group_id) REFERENCES item_group(id)
);

-- customer orders (one per order placed)
CREATE TABLE customer_order (
    id SERIAL PRIMARY KEY,
    table_number INT,
    status VARCHAR(30) NOT NULL DEFAULT 'PLACED',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- items within an order
CREATE TABLE customer_order_item (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    FOREIGN KEY (order_id) REFERENCES customer_order(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_item(id)
);

CREATE TYPE role AS ENUM ('CUSTOMER', 'WAITER', 'KITCHEN');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role role NOT NULL
);

INSERT INTO users (email, password_hash, role)
VALUES (
    'admin@oaxaca.com',
    '$2a$10$mYY0PtF7uw3Fb5pv5WB5ou6e8wsY.ZAOoRcGPivLINUJ92C5pzLd2',
    'WAITER'
);


