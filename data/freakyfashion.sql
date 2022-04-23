CREATE DATABASE freakyfashion;

CREATE TABLE product (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(50) NOT NULL,
	description VARCHAR(250) NOT NULL,
	brand VARCHAR(50) NOT NULL,
	image_url VARCHAR(150) NOT NULL,
    price NUMERIC(5,2) NOT NULL,
    likes INTEGER NOT NULL,
	ulr_slug VARCHAR(50) NOT NULL,
	PRIMARY KEY(id)
);

INSERT INTO product (
    name,
    description,
    brand,
    image_url,
    price,
    likes,
    url_slug
) VALUES
(
    'Svart T-shirt',
    'Lorem ipsum dolor',
    'Levis',
    'https://via.placeholder.com/320x320.png?text=Svart+T-shirt',
    249,
    199,
    'svart-tshirt'
);
INSERT INTO product (
    name,
    description,
    brand,
    image_url,
    price,
    likes,
    url_slug
) VALUES
(
    'Vit T-shirt',
    'Lorem ipsum dolor',
    'Levis',
    'https://via.placeholder.com/320x320.png?text=Vit+T-shirt',
    189,
    149,
    'vit-tshirt'
);

INSERT INTO product 
(name, description, brand, image_url, price, likes, url_slug)
VALUES
('Gron T-shirt', 'Lorem ipsum', 'Zara', 'https://via.placeholder.com/320x320.png?text=Gron+T-shirt', '159', '68', 'gron-tshirt')