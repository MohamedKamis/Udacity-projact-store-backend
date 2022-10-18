# store-backend

///////////////// 1-install packages /////////////////////
--------------------------------------------------------------
(
npm i
yarn i
)
///////////////// 2-open the trminal Make /////////////////////
--------------------------------------------------------------

open the psql shell on your machine and apply its default configurations
create your user with superuser privileges and create the two databases for development and testing purposes
------------------------------------------------------
CREATE USER postgres WITH PASSWORD '12345' SUPERUSER;
CREATE DATABASE store OWNER store ENCODING UTF8;
------------------------------------------------------
CREATE File  (.env)
--------------------
add this data in File (
        PORT=2000
        NODE_ENV=dev

        Postgres_host=127.0.0.1
        Postgres_user=postgres
        Postgres_password=12345
        Postgres_database=store

        BCRYPT_PASSWORD=your-secret-password 
        SALT_ROUNDS=10
        TOKEN_SECRET=your-secret-token
)

///////////////// 3- run migrate  ////////////////////////////
--------------------------------------------------------------
(
npm run mu || yarn mu /*for db-migrate up*/
npm run md || yarn mu /*for db-migrate done*/
)
///////////////// 4- run projact  ////////////////////////////
--------------------------------------------------------------

npm run dev || yarn dev

///////////// 5- CRUD user product order order_product  ////////////////
----------------------------------
http://localhost:2000/product
        (post)
will return the new added product
Body: {
    name: 'new product',
    price: 250,
}
-----------------------------------
|
----------------------------------
http://localhost:2000/product
        (get)
you well get all prodect
-----------------------------------
|
-----------------------------------
http://localhost:2000/product/id
        (get)
you well get a prodect (id)
 ____________________________________________________________
|                                                            |
| you can changing (prodect) =>{user , order , order-product}|
|____________________________________________________________|

///////////// 6- log in  ////////////////
http://localhost:2000/user/login

Body: {
    firstname: 'firstname user',
    password: 'pass user',
}

<<<<<<<<<<<<<<------Have fun---------->>>>>>>>>>>>>>>

