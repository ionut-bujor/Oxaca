DROP TABLE IF EXISTS customer_order_item CASCADE;
DROP TABLE IF EXISTS customer_order CASCADE;

DROP TABLE IF EXISTS menu_item_tags CASCADE;
DROP TABLE IF EXISTS menu_item_allergens CASCADE;

DROP TABLE IF EXISTS menu_item CASCADE;
DROP TABLE IF EXISTS item_group CASCADE;
DROP TABLE IF EXISTS menu_type CASCADE;

DROP TABLE IF EXISTS users CASCADE;

DROP TYPE IF EXISTS dietary_tag CASCADE;
DROP TYPE IF EXISTS allergens CASCADE;
DROP TYPE IF EXISTS role CASCADE;


-- enums
CREATE TYPE dietary_tag AS ENUM ('VEGAN', 'GLUTEN_FREE', 'SPICY', 'VEGETARIAN');
CREATE TYPE allergens AS ENUM ('DAIRY', 'NUTS', 'GLUTEN', 'FISH', 'SHELLFISH', 'SOY','SESAME');
CREATE TYPE role AS ENUM ('CUSTOMER', 'WAITER', 'KITCHEN');


-- type of menu
CREATE TABLE menu_type (
                           id SERIAL PRIMARY KEY,
                           name VARCHAR(30) NOT NULL UNIQUE
);


-- item group
CREATE TABLE item_group(
                           id SERIAL PRIMARY KEY,
                           name VARCHAR(30) NOT NULL,
                           menu_type_id INT NOT NULL,
                           FOREIGN KEY (menu_type_id) REFERENCES menu_type(id)
);


-- menu items
CREATE TABLE menu_item (
                           id SERIAL PRIMARY KEY,
                           item_name VARCHAR(30) NOT NULL,
                           item_description VARCHAR(100) NOT NULL,
                           item_quantity INT NOT NULL,
                           item_price NUMERIC(10,2) NOT NULL,
                           item_image_url TEXT NOT NULL,
                           item_group_id INT NOT NULL,
                           calories INT,
                           FOREIGN KEY (item_group_id) REFERENCES item_group(id)
);


-- enums as tables
CREATE TABLE menu_item_tags (
                                menu_item_id INT NOT NULL,
                                tag varchar(255) NOT NULL,
                                PRIMARY KEY (menu_item_id, tag),
                                FOREIGN KEY (menu_item_id) REFERENCES menu_item(id) ON DELETE CASCADE
);

CREATE TABLE menu_item_allergens (
                                     menu_item_id INT NOT NULL,
                                     allergens varchar(255) NOT NULL,
                                     PRIMARY KEY (menu_item_id, allergens),
                                     FOREIGN KEY (menu_item_id) REFERENCES menu_item(id) ON DELETE CASCADE
);


-- customer order
CREATE TABLE customer_order (
                                id SERIAL PRIMARY KEY,
                                table_number INT,
                                status VARCHAR(30) NOT NULL DEFAULT 'PLACED',
                                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

 -- orders
CREATE TABLE customer_order_item (
                                     id SERIAL PRIMARY KEY,
                                     order_id INT NOT NULL,
                                     menu_item_id INT NOT NULL,
                                     quantity INT NOT NULL CHECK (quantity > 0),
                                     FOREIGN KEY (order_id) REFERENCES customer_order(id) ON DELETE CASCADE,
                                     FOREIGN KEY (menu_item_id) REFERENCES menu_item(id)
);


-- USERS
CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password_hash VARCHAR(255) NOT NULL,
                       role role NOT NULL
);

