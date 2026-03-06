
-- type of menu
CREATE TABLE IF NOT EXISTS menu_type (
                           id SERIAL PRIMARY KEY,
                           name VARCHAR(30) NOT NULL UNIQUE
);


-- item group
CREATE TABLE IF NOT EXISTS item_group(
                           id SERIAL PRIMARY KEY,
                           name VARCHAR(30) NOT NULL,
                           menu_type_id INT NOT NULL,
                           FOREIGN KEY (menu_type_id) REFERENCES menu_type(id)
);


-- menu items
CREATE TABLE IF NOT EXISTS menu_item (
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
CREATE TABLE IF NOT EXISTS menu_item_tags (
                                menu_item_id INT NOT NULL,
                                tag varchar(255) NOT NULL,
                                PRIMARY KEY (menu_item_id, tag),
                                FOREIGN KEY (menu_item_id) REFERENCES menu_item(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS menu_item_allergens (
                                     menu_item_id INT NOT NULL,
                                     allergens varchar(255) NOT NULL,
                                     PRIMARY KEY (menu_item_id, allergens),
                                     FOREIGN KEY (menu_item_id) REFERENCES menu_item(id) ON DELETE CASCADE
);


-- customer order
CREATE TABLE IF NOT EXISTS customer_order (
                                id SERIAL PRIMARY KEY,
                                table_number INT,
                                status VARCHAR(30) NOT NULL DEFAULT 'PLACED',
                                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- USERS
CREATE TABLE IF NOT EXISTS users (
                       id SERIAL PRIMARY KEY,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password_hash VARCHAR(255) NOT NULL,
                       role VARCHAR(255) NOT NULL,
                       first_name VARCHAR(255) NOT NULL,
                       last_name VARCHAR(255) NOT NULL
);

