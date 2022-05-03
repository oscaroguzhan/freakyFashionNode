--DDL
CREATE DATABASE freakyfashion;

CREATE TABLE product (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(250) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    image_url VARCHAR(150) NOT NULL,
    price NUMERIC(5, 2) NOT NULL,
    likes INTEGER NOT NULL,
    url_slug VARCHAR(50) NOT NULL,
    PRIMARY KEY(id),
    UNIQUE (url_slug)
);

-- TODO: SKAPA EN TABELL SOM KAN HALLA KATEGORIER 
-- EN KATEGORI HAR ETT NAMN (MAX 50 TECKEN, OBLIGATORISK)
-- SAMT EN URL_SLUG  (MAX 50 TECKEN, OBLIGATORISK)
--TABELLEN SKA HA EN KOLUMN FÖR ID SOM RÄKNAS UP AUTOMATISK AV DB
CREATE TABLE category (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL,
    url_slug VARCHAR(50) NOT NULL,
    PRIMARY KEY(id),
    UNIQUE (url_slug)
)

-- RELATIONER
--en till många 
    -- kund-order (tex en kund kan ha flera order, 1 order tillhör en kund)
    --order-orderrader(1 order kan ha flera orderrader)
    
--manga till manga 
    --student-kurs (en student kan gå till flerakurser, en kurs kan ha flera studenter)
    --kategori-produkt (1 kategori kan ha flera produkter, 1 produkt ksn ingå flera kategorier)

--en till en 
    -- 

---------- SKAPA RELATIONER (associare en product with en category)--------------
-- KATEGORI-PRODUKT (MÅNGA TILL MÅNGA)
-- PROBLEMS WITH REFERENCE INTEGRITET AND KOPPLA EN PRODUCT MER ÄN 1 GÅNG TILL CATEGORY 
CREATE TABLE category_product(
    category_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL
);


--FIXME: PROBLEM 2 det går ju att koppla en produkt mer än 1 gång till en kategori
--delete table 
DROP TABLE category_product;

--unique to solve problem do it is not possible connect en product with en category more than once
CREATE TABLE category_product(
    category_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    UNIQUE (category_id, product_id),
    FOREIGN KEY(category_id) REFERENCES category(id),
    FOREIGN KEY(product_id) REFERENCES product(id)
);

-- Man kan also använda sammansatta primärnyckel

CREATE TABLE category_product(
	category_id INTEGER NOT NULL,
	product_id INTEGER NOT NULL,
	--SAMMANSATT PRIMER NYCKEL
	PRIMARY KEY (category_id, product_id),
	FOREIGN KEY(category_id)
	REFERENCES category(id),
	FOREIGN KEY(product_id)
	REFERENCES product(id)
);

-- LAST VERSION
CREATE TABLE category_product(
	category_id INTEGER NOT NULL,
	product_id INTEGER NOT NULL,
	--SAMMANSATTA PRIMÄRNYCKEL
	PRIMARY KEY (category_id, product_id),
	FOREIGN KEY(category_id)
	REFERENCES category(id)
	--TA BORT KOPPLINGER IFALL VI VILL RADERA EN PRODUKT
	ON DELETE CASCADE,
	FOREIGN KEY(product_id)
	REFERENCES product(id)
	--TA BORT KOPPLINGER AV PRODUKTEN IFALL VI VILL RADERA EN PRODUKT
	ON DELETE CASCADE
);

-- delete product från en category even radera inkopplade 
-- ANVÄND ON DELETE CASCADE
-- DELETE PRODUKT WITH ID 2 
DELETE FROM product WHERE id = 2;