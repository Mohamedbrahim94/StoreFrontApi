# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show (args: product id)
- Create (args: Product)[token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show (args: id)[token required]
- Create (args: User)[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
 >>> In the SCREENSHOT DIRECTORY there's a folder named schemas having screenshot of the database tables schemas   
#### Equipment
-  id                 >> type : integer, unique id to define equipment.   
- name                >> type : Character varying(150) , define name of the equipment.
- price               >> type : integer , defining the price of the equipment.
- [OPTIONAL] category >> type : Character varying(100), defining the category of the equipment.

 >> equipment table schema >> just check this directory >> [Screenshots\database\schema\display equipment table schema.png]

#### User
- id                 >> type : integer, NOT NULL , unique id to define user.
- username           >> type : text, NOT NULL , unique username to define username.
- firstName          >> type : character varying (150) , not null , define user firstname
- lastName           >> type : character varying (150) , not null , define user firstname
- password_digest    >> type : character varying (255) , not null , define user password
- email              >> type : character varying (150) , define user email
- user_role          >> type : character varying (30) , define user role

>> users table schema >> just check this directory >> Screenshots\database\schema\display user table schema.png

#### Orders 
- id                                    >> type : integer, NOT NULL , unique id to define order.
- status                                >> type : character varying(20) , define order status.
- user_id                               >> type : bigint , define user id who have an order.

>> order table schema >> just check this directory >> Screenshots\database\schema\display orders table schema.png

#### order_equipments
- id of each product in the order         >> type : integer , not Null , define id of an equipment 
- quantity of each product in the order   >> type : integer , define the quantity of the ordered equipment
- order_id                                >> type : bigint  , define the order id
- equipment id                            >> type : bigint  , define the equipment id ordered

>> order_equipment schema >> just check this directory >> Screenshots\database\schema\order_equipment table schema.png
