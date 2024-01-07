# Backend-GlobeMart
Web application of a modern and innovative e-commerce marketplace. 

## Overview. 
This application might be capable of :  
  * listing a huge amount of products that are created by sellerCompanies
  * handling a large number of users within 3 types of users 
  * creating user orders that consist of one or more cartItems
  * making the payment of this order through secure online payment method platform

As a seller-user you will be able to :
  * create your own seller space to upload, accomodate, advertise and sell your own company products
  * check your sales data
  * [retrieve the money from product sales through PayPal]
  * [obtain sales analitycs]***

When logIn, a seller will be able to chose wether of his companies he wants to logIn with.  
     
## Database Diagram

![database](https://github.com/OscarJimenezGonzalez/Backend-GlobeMart/blob/main/Globe%20Mart%20(8).png?raw=true)


## Database Roles and Functions

* Admin: this is a full access role. Admin is able to create, update and delete users, cartItems, orders, products, sellerCompanies and product categories. 
* Seller: 
    - Auth --> SignIn/LogIn
    - User --> Seller is able to CRUD its Own User Data
    - SellerCompany --> Seller is able to CRUD its Own Seller Company.  
    - Product --> Seller is able to Create a new product to the marketplace database
    - Product --> Seller is able to Get a list of all the products of the marketplace database
    - Product_SellerCompany --> Seller is able to Create a version of an existing product, this means adding a price a photo and more. 
    - Orders --> Seller is able to Get a list of the orders that customers has made to their own sellers store. 

* Customer: 
    - Auth --> SignIn/LogIn
    - User --> Customer is able to CRUD its Own User Data
    - Orders --> Customer is able to Create an order consisting of one or more cartItems.
    - Orders --> Customer is able to Get a list of all the orders made in the past with his username. 
    - CartItem --> Customer is able to Create a cartItem, this way a customer links a single product to a single user (itself) and to an order. 

## Database EndPoints

### Signup/Login

| METHOD | ENDPOINT          | TOKEN | ROLE   | DESCRIPTION        | POST PARAMS                                      | RETURNS                |
|--------|-------------------|-------|--------|--------------------|--------------------------------------------------|------------------------|
| POST   | /auth/signup      | -     | all    | User Signup        | `username`, `password`, `email`                  | { token: `token` }     |
| POST   | /auth/login       | -     | all    | User Login         | `username or email`, `password`                  | { token: `token` }     |


### User Endpoints

| METHOD | ENDPOINT           | TOKEN | ROLE             | DESCRIPTION        | POST PARAMS                              | RETURNS                           |
|--------|--------------------|-------|------------------|--------------------|------------------------------------------|-----------------------------------|
| GET    | /user              | YES   | admin            | Get All Users      | `query params`                           | [{user}]                          |
| GET    | /user/profile      | YES   | customer/seller  | Get Own Profile    |                                          | {user}                            |
| GET    | /user/:userId      | YES   | admin            | Get One User       |                                          | {user}                            |
| POST   | /user              | YES   | admin            | Create one User    |  `username`, `password`, `role`, `email` | {user}                            |
| PUT    | /user/profile      | YES   | customer/seller  | Update own profile |  `username`, `email`                     | {message: 'Profile updated'}      |
| PUT    | /user/password     | YES   | customer/seller  | Reset password     |  `newPassword`, `repeatPassword`         | {message: 'Password updated'}     |
| PUT    | /user/:userId      | YES   | admin            | Update one user    |  `username`, `password`, `role`, `email` | {message: 'User updated'}         |
| DELETE | /user/:userId      | YES   | admin            | Delete one user    |                                          | {message: 'User deleted'}         |
| DELETE | /user/profile      | YES   | customer/seller  | Delete own profile |                                          | {message: 'Profile deleted'}      |


### SellerCompany Endpoints

| METHOD | ENDPOINT                           | TOKEN | ROLE   | DESCRIPTION                         | POST PARAMS                                     | RETURNS                                   |
|--------|------------------------------------|-------|--------|-------------------------------------|-------------------------------------------------|-------------------------------------------|
| GET    | /sellerCompany                     | YES   | admin  | Get All SellerCompanies             | `query params`                                  | [{SellerCompany}]                         |
| GET    | /sellerCompany/:sellerCompanyId    | YES   | admin  | Get One SellerCompany               |                                                 | {SellerCompany}                           |
| GET    | /sellerCompany/profileCompany      | YES   | seller | Get Own SellerCompany               |                                                 | {SellerCompany}                           |
| POST   | /sellerCompany                     | YES   | admin  | Create One SellerCompany            | `CIF`,`name`, `location`, `user_id`             | {SellerCompany}                           |
| PUT    | /sellerCompany/:sellerCompanyId    | YES   | admin  | Update One SellerCompany            | `CIF`,`name`, `location`, `user_id`             | {message: 'SellerCompany   updated'}      |
| PUT    | /sellerCompany/profileCompany      | YES   | seller | Update Own SellerCompany            | `CIF`,`name`, `location`                        | {message: 'Own SellerCompany   updated'}  |
| DELETE | /sellerCompany/:sellerCompanyId    | YES   | admin  | Delete one SellerCompany            |                                                 | {message: 'SellerCompany deleted'}        |
| DELETE | /sellerCompany/profileCompany      | YES   | seller | Delete Own SellerCompany            |                                                 | {message: 'Own SellerCompany deleted'}    |


### Product Endpoints

| METHOD | ENDPOINT                           | TOKEN | ROLE   | DESCRIPTION                 | POST PARAMS                                                              | RETURNS                          |
|--------|------------------------------------|-------|--------|-----------------------------|--------------------------------------------------------------------------|----------------------------------|
| GET    | /product                           | YES   | all    | Get All product             | `query params`                                                           | [{product}]                      |
| GET    | /product/profileCompany            | YES   | seller | Get All own products        | `query params`                                                           | [{product}]                      |
| GET    | /product/:productId                | YES   | all    | Get One product             |                                                                          | {product}                        |
| POST   | /product                           | YES   | admin  | Create One product          | `name`,`model`, `brand`, `price`,`imgURL`,`onSale`,`productCategory_id`  | {product}                        |
| POST   | /product/profileCompany            | YES   | seller | Create Own Company product  | `name`,`model`, `brand`, `price`,`imgURL`,`onSale`,`productCategory_id`  | {product}                        | 
| PUT    | /product/:productId                | YES   | admin  | Update One product          | `name`,`model`, `brand`, `price`,`imgURL`,`onSale`,`productCategory_id`  | {message: 'product updated'}     |
| PUT    | /product/profileCompany/:productId | YES   | seller | Update Own Company product  | `name`,`model`, `brand`, `price`,`imgURL`,`onSale`,`productCategory_id`  | {message: 'own product updated'}  |
| DELETE | /product/:productId                | YES   | admin  | Delete one product          |                                                                          | {message: 'product deleted'}     |
| DELETE | /product/profileCompany/:productId | YES   | seller | Delete Own Company product  |                                                                          | {message: 'own product deleted'} |


### ProductCategory Endpoints

| METHOD | ENDPOINT                             | TOKEN | ROLE  | DESCRIPTION                 | POST PARAMS      | RETURNS                              |
|--------|--------------------------------------|-------|-------|-----------------------------|------------------|--------------------------------------|
| GET    | /productCategory                     | YES   | admin | Get All productCategory     | `query params`   | [{productCategory}]                  |
| GET    | /productCategory/:productCategoryId  | YES   | admin | Get one productCategory     |                  | {productCategory}                    |
| POST   | /productCategory                     | YES   | admin | Create one productCategory  | `name`           | {productCategory}                    |
| PUT    | /productCategory/:productCategory    | YES   | admin | Update one productCategory  | `name`           | {message: 'productCategory updated'} |
| DELETE | /productCategory/:productCategory    | YES   | admin | Delete one productCategory  |                  | {message: 'productCategory deleted'} |


### CartItem Endpoints

| METHOD | ENDPOINT                           | TOKEN | ROLE     | DESCRIPTION                         | POST PARAMS                                     | RETURNS                          |
|--------|------------------------------------|-------|----------|-------------------------------------|-------------------------------------------------|----------------------------------|
| GET    | /cartItem                          | YES   | admin    | Get All cartItems                   | `query params`                                  | [{cartItem}]                     | 
| POST   | /cartItem                          | YES   | admin    | Create one cartItem                 | `User_id`,`Product_SellerCompany_Id`, `Oder_id` | {cartItem}                       |
| POST   | /cartItem/profile                  | YES   | customer | Create Own cartItem                 | `User_id`,`Product_SellerCompany_Id`, `Oder_id` | {cartItem}                       |
| PUT    | /cartItem/:cartItemId              | YES   | admin    | Update one cartItem                 | `User_id`,`Product_SellerCompany_Id`, `Oder_id` | {message: 'cartItem updated'}    |
| DELETE | /cartItem/:cartItemId              | YES   | admin    | Delete one cartItem                 |                                                 | {message: 'cartItem deleted'}    |

[El cliente crea uno o varios cartItems al aceptar una order para que se creen todas las relaciones oportunas] 

### Order Endpoints

| METHOD | ENDPOINT                | TOKEN | ROLE             | DESCRIPTION                 | POST PARAMS                                                                   | RETURNS                         |
|--------|-------------------------|-------|------------------|-----------------------------|-------------------------------------------------------------------------------|---------------------------------|
| GET    | /order                  | YES   | admin            | Get All orders              | `query params`                                                                | [{order}]                       |
| GET    | /order/profile          | YES   | customer         | Get All Own orders          | `query params`                                                                | [{order}]                       |
| GET    | /order/seller/profile   | YES   | seller           | Get All Own orders          | `query params`                                                                | [{order}]                       |
| POST   | /order                  | YES   | admin            | Create one order            | `billNumber`,`date`,`totalPrice`, `status`, `shippingAddres`, `paymentMethod` | {order}                         |
| POST   | /order/profile          | YES   | customer         | Create Own order            | `billNumber`,`date`,`totalPrice`, `status`, `shippingAddres`, `paymentMethod` | {order}                         |
| PUT    | /order/:orderId         | YES   | admin            | Update one order            | `billNumber`,`date`,`totalPrice`, `status`, `shippingAddres`, `paymentMethod` | {message: 'order updated'}      |
| DELETE | /order/:orderId         | YES   | admin            | Delete one order            |                                                                               | {message: 'order deleted'}      |
