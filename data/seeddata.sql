--DML
INSERT INTO
    product (
        name,
        description,
        brand,
        image_url,
        price,
        likes,
        url_slug
    )
VALUES
    (
        'Svart T-shirt',
        'Lorem ipsum dolor',
        'Levis',
        'https://via.placeholder.com/320x320.png?text=Svart+T-shirt',
        249,
        199,
        'svart-tshirt'
    );

INSERT INTO
    product (
        name,
        description,
        brand,
        image_url,
        price,
        likes,
        url_slug
    )
VALUES
    (
        'Vit T-shirt',
        'Lorem ipsum dolor',
        'Levis',
        'https://via.placeholder.com/320x320.png?text=Vit+T-shirt',
        189,
        149,
        'vit-tshirt'
    );

INSERT INTO
    product (
        name,
        description,
        brand,
        image_url,
        price,
        likes,
        url_slug
    )
VALUES
    (
        'Gron T-shirt',
        'Lorem ipsum',
        'Zara',
        'https://via.placeholder.com/320x320.png?text=Gron+T-shirt',
        '159',
        '68',
        'gron-tshirt'
    )
INSERT INTO
    category(name, url_slug)
VALUES
    ('T-shirts', 't-shirts'),
    ('Påsk', 'pask') -- KOPPLA IN EN PRODUKT TILL EN CATEGORY
INSERT INTO
    category_product(category_id, product_id)
VALUES
    (1, 1);

INSERT INTO
    category_product(category_id, product_id)
VALUES
    (1, 2);

INSERT INTO
    category_product(category_id, product_id)
VALUES
    (2, 1);

INSERT INTO
    category_product(category_id, product_id)
VALUES
    (2, 2);

--FIXME: FÖRSTA PROBLEM MED KOPPLINGSTABELLEN HÄR UPPE ÄR 
--   INGEN REFERENCE INTEGRITET (vi kan fylla på med skärp data som inte egentligen finns i db)
-- fix the reference integritet genom att modifiera ddl syntax när vi skapar kopplingstabel
CREATE TABLE category_product(
    category_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    FOREIGN KEY(category_id) REFERENCES category(id),
    FOREIGN KEY(product_id) REFERENCES product(id)
);

-- TODO: OBSERVERA WHEN WE USE FOREIGN KEY AND REFERENCE 
--gives error because there is no product with a product_id 4 in db 
INSERT INTO
    category_product(category_id, product_id)
VALUES
(2, 4);

--man behöver 3 sql syntax om man inte använda INNER JOIN 

-- SELECT id,
-- 	   name
--  FROM category
--  WHERE url_slug = 't-shirts'
--  alla produkter som är kopplat till andra category 
--  SELECT *
--  	FROM category_product
-- 	WHERE category_id =2;
-- produkt upp details av produkter som är koplat till categorin
-- SELECT id,
	   name,
	   description,
	   brand,
	   image_url,
	   price,
	   likes,
	   url_slug
	   
	FROM product
	WHERE id IN (1,3);
	
-- koppla ihop tabeller vid INNER JOIN

SELECT *
	FROM category
  INNER JOIN category_product
  	ON category_product.category_id = category_id
  WHERE url_slug = 't-shirts';