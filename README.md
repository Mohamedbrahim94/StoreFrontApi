#   *****STOREFRONT_API_BACKEND_PROJECT*****

## Project Overview
 An online storefront to showcase product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page.

## Main Libraries used:
-  Node
-  Express
-  Typescript
-  Jasmine
-  db-migrate
-  dotenv
-  Postgres
-  jsonwebtoken

## SETUP: 
### 1- App setup $$ Commands used :
-  NODE version v16.13.1
I-NPM INSTALLATION/ TYPESCRIPT :
1- $ npm init
2- $ npm i --save-dev typescript 
3- $ npm i --save-dev ts-node
4- $ npm i --save-dev @types/node
5- adding Script : "build": "npx tsc"
II-Express INSTALLATION:  
1- $npm i express
2- $npm i @types/express
3- $npm i nodemon
#SCRIPTS :
- "start": "nodemon --exec npx ts-node src/index.ts"
-  To run the server , use command: $ npm run start
-  Whenever server crashes we should kill the port and restart it again using cmd:
     $ taskkill /im node.exe /F

III-Postgres/dotenv/tsc-watch INSTALLATION: 
### COMMANDS: 
1- $npm install pg 
2- $npm i --save-dev @types/pg
3- $npm i dotenv
4- $npm install tsc-watch --save-dev
### SCRIPTS:
- "watch": "tsc-watch --esModuleIntrerop  src/server.ts --outDir ./dist  --onSuccess 'node ./dist/server.js'"

## 2-Database :
- Database works on PORT : 5432
- psql commands for creating database and give user all access :
   CREATE DATABASE store_dev ;
   CREATE DATABASE store_test;
   GRANT ALL PRIVILEGES ON DATABASE store_dev TO postgres;
   GRANT ALL PRIVILEGES ON DATABASE store_test TO postgres;

- Database schemas : 
         In the SCREENSHOT DIRECTORY there's a folder named schemas having screenshot of the database tables schemas,
            check those relative paths:
            1- Screenshots\database\schema\database display schemas 1.png 
            2- Screenshots\database\schema\display equipment table schema.png
            3- Screenshots\database\schema\display orders table schema.png
            4- Screenshots\database\schema\display user table schema.png
            5- Screenshots\database\schema\order_equipment table schema.png

## Data Shapes
 - In the SCREENSHOT DIRECTORY there's a folder named schemas having screenshot of the database tables schemas   
### Equipment
-  id                 >> type : integer, unique id to define equipment.   
- name                >> type : Character varying(150) , define name of the equipment.
- price               >> type : integer , defining the price of the equipment.
- [OPTIONAL] category >> type : Character varying(100), defining the category of the equipment.

 > equipment table schema >> just check this directory >> [Screenshots\database\schema\display equipment table schema.png]

### User
- id                 >> type : integer, NOT NULL , unique id to define user.
- username           >> type : text, NOT NULL , unique username to define username.
- firstName          >> type : character varying (150) , not null , define user firstname
- lastName           >> type : character varying (150) , not null , define user firstname
- password_digest    >> type : character varying (255) , not null , define user password
- email              >> type : character varying (150) , define user email
- user_role          >> type : character varying (30) , define user role

>> users table schema >> just check this directory >> Screenshots\database\schema\display user table schema.png

### Orders 
- id                                    >> type : integer, NOT NULL , unique id to define order.
- status                                >> type : character varying(20) , define order status.
- user_id                               >> type : bigint , define user id who have an order.

>> order table schema >> just check this directory >> Screenshots\database\schema\display orders table schema.png

### order_equipments
- id of each product in the order         >> type : integer , not Null , define id of an equipment 
- quantity of each product in the order   >> type : integer , define the quantity of the ordered equipment
- order_id                                >> type : bigint  , define the order id
- equipment id                            >> type : bigint  , define the equipment id ordered

> order_equipment schema >> just check this directory >> Screenshots\database\schema\order_equipment table schema.png

## 3- Migrations:
> In node app we will create tables and adding data to those tables and have the ability to remove (drop) , edit tables and their data .
> Database migration INSTALLATION: 
#COMMANDS used : 
1- $npm install -g db-migrate
2- $npm install --save db-migrate
3- $npm install --save db-migrate-pg
4- $node node_modules/db-migrate/bin/db-migrate create (name)-table --sql-file   >> command for creating migrations. 
5- $node node_modules/db-migrate/bin/db-migrate up OR $ npx db-migrate up        >> command for migrating up
6- $ npm run migrate-down or $ npx db-migrate down                               >> command to migrate table one by one
7- $npx db-migrate up --e test                                                   >> to migrate tables up to the test environment                             
8- $ npx db-migrate --env test reset                                             >> to reset and drop down tables all at a time


#### SCRIPTS :
- "migrate-up":   "npx db-migrate up"
- "migrate-down" : "npx db-migrate-down"


1-FOR CREATING TABLES and migration :
$node node_modules/db-migrate/bin/db-migrate create users-table --sql-file
$node node_modules/db-migrate/bin/db-migrate create equipments-table --sql-file
$node node_modules/db-migrate/bin/db-migrate create orders-table --sql-file
$node node_modules/db-migrate/bin/db-migrate create order_equipment-table --sql-file

2- migration up tables in dev :
 $ npm run migrate-up  OR  $ npx db-migrate up 

3- migration tables up to test :
 $ npx db-migrate up --e test 

4- migration table down 
 $  $ npm run migrate-down or $ npx db-migrate down 

5- in case of test failure reset migration is a must which can be run by this script:
 $ npx db-migrate --env test reset 



### 4- Environment Setup:
> Ignoring "ENV" while uploading to github as a term of security so just create ".env" file and add the following data:

POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store_dev
POSTGRES_TEST_DB=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=12345
ENV=dev
DB_PORT=5432
BCRYPT_PASSWORD=watch-match-friends 
SALT_ROUNDS=10
TOKEN_SECRET=ibrahim

> Node_modules has been deleted , you have to run cmd: 
- $ npm run build to create node modules 

## RESTful EndPoints:
> I have added some optional ENDPOINTS

> Server homePage works on PORT 3000 >> http://localhost:3000/

### 1-users:
1-http://localhost:3000/users                              >> With GET/POST REQUEST 
2-http://localhost:3000/users/5                            >> With GET/DELETE/PUT REQUESTS
3-http://localhost:3000/users/login                        >> With POST REQUEST

### 2-orders:
1-http://localhost:3000/orders                             >> With GET/POST REQUEST 
2-http://localhost:3000/orders/3                           >> With GET/DELETE/PUT REQUESTS
3-http://localhost:3000/orders/2/equipments                >> With POST REQUEST

### 3-products:
1-http://localhost:3000/equipments                         >> With GET/POST REQUEST 
2-http://localhost:3000/equipments/4                       >> With GET/DELETE/PUT REQUESTS
3- [optional] http://localhost:3000/equipments/category/FORKLIFT       >> With GET REQUEST 

### 4-Dashboard:
1-[optional] http://localhost:3000/equipments-in-orders               >> With GET REQUEST 
2-[optional] http://localhost:3000/users-with-orders                  >> With GET REQUEST
3-[optional] http://localhost:3000//five-most-popular                 >> With GET REQUEST
4-[optional] http://localhost:3000/five-most-expensive                >> With GET REQUEST




### Testing :
#### >> 1- unit testing
- Unit testing has been applied using jasmine and all test has been passed successfully using cmd :
 $ mpm run test
- Note: You should reset the testes after failures to drop down using command :
 $ npx db-migrate --env test reset  
 then migrate up to the test environment using command :
 $ npx db-migrate up --e test   then re-test using command :
 $ npm run test
 - Jasmine INSTALLATION + SUPERTEST :
#### COMMANDS: 
1-  $npm i --save-dev jasmine
2-  $npm i --save-dev jasmine-spec-reporter
3-  $npm i --save-dev jasmine-spec-builder
4-  $npm i --save-dev jasmine-ts-console-reporter
5-  $npx jasmine init
6-  $npm i --save-dev @types/jasmine
7-  $npm i --save-dev supertest
8-  $npm i --save-dev @types/supertest
#### SCRIPTS : 
- "jasmine": "jasmine"
- "test": "export ENV=test|| set ENV=test && db-migrate up && npm run build && npm run jasmine && npx db-migrate reset"

#### >> 2- POSTMAN for testing Methods and Routes
- There's a directory named screenshoots icludes all POSTMAN requests from testing api methods and routes.
- Also Bear token is used in Headers as ( key , value ) >> (Authorization , Bear token).





