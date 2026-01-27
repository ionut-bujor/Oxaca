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

-- the actual items (prawns, carbonara, etc.)
CREATE TABLE menu_item (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(30) NOT NULL,
    item_description VARCHAR(100) NOT NULL,
    item_quantity int NOT NULL,
    item_price NUMERIC(10,2) NOT NULL,
    item_picture_url TEXT NOT NULL,
    item_group_id INT NOT NULL,
    FOREIGN KEY (item_group_id) REFERENCES item_group(id)
);

