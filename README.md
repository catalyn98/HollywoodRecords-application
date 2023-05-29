<h1 align="center">
  Hollywood Records
</h1>
<p align="center">
  ReactJS, NodeJS, ExpressJS, MongoDB
</p>

<img align="center" src="https://firebasestorage.googleapis.com/v0/b/licenseproject-c2773.appspot.com/o/mern.png?alt=media&token=3ec9ebdd-6476-4ae2-b172-7fcb635c072d" />

# Tech stack
Hollywood Records uses a number of open source projects to work properly:
* [ReactJS](https://reactjs.org/) - a JavaScript library for building user interfaces.
* [NodeJS](https://nodejs.org/) - is an open-source, server-side JavaScript runtime environment that allows you to run JavaScript code on the server.
* [ExpressJS](https://expressjs.com/) - is a popular web application framework for Node.js. It provides a set of features and tools that simplify the process of building web applications and APIs.
* [MongoDB](https://www.mongodb.com/) - a document-oriented, No-SQL database used to store the application data.

# Installation
Hollywood Records application requires [Node.js](https://nodejs.org/) to run.

### Clone the repositories
```sh
$ git clone https://github.com/catalyn98/HollywoodRecords-application.git
```

### Set environment variables 
To set up your project, follow these steps:
1. Create a *.env* file in the following directories: the *backend api* folder, the *frontend-user* folder, and the *frontend-admin* folder, this file will store your environment variables.
2. Create a MongoDB database and obtain the connection string provided by MongoDB for connecting to your database.
3. Create a Firebase project and obtain the Firebase connection string.

### Install the dependencies:
Start the server:
```sh
$ cd backend api
$ npm install 
$ npm start 
```

Start the frontend user:
```sh
$ cd frontend-user
$ npm install 
$ npm start 
```

Start the frontend admin:
```sh
$ cd frontend-admin
$ npm install 
$ npm start 
```

# Web application screenshots 
| <p align="center">**Home**</p> | <p align="center">**All products by category**</p> | <p align="center">**All products**</p> |
| ------------ | ------------ | ------------ |
| <img src="https://github.com/catalyn98/hollywood-records/blob/main/screenshoots%20app/User/1.Home.png" />  |  <img src="https://github.com/catalyn98/hollywood-records/blob/main/screenshoots%20app/User/2.All%20products%20by%20category.png" /> | <img src="https://github.com/catalyn98/hollywood-records/blob/main/screenshoots%20app/User/3.All%20products.png" /> |
| <p align="center">**Product details**</p> | <p align="center">**Cart**</p> | <p align="center">**My orders**</p> |
| <img src="https://github.com/catalyn98/hollywood-records/blob/main/screenshoots%20app/User/4.Product%20details.png" /> | <img src="https://github.com/catalyn98/hollywood-records/blob/main/screenshoots%20app/User/5.Cart.png" /> | <img src="https://github.com/catalyn98/hollywood-records/blob/main/screenshoots%20app/User/6.My%20orders.png" /> |
| <p align="center">**Login**</p> | <p align="center">**Register**</p> | <p align="center">**Reset password**</p> |
| <img src="https://github.com/catalyn98/hollywood-records/blob/main/screenshoots%20app/User/7.Login.png" /> | <img src="https://github.com/catalyn98/HollywoodRecords-application/blob/main/screenshoots%20app/User/8.Register.png" /> | <img src="https://github.com/catalyn98/HollywoodRecords-application/blob/main/screenshoots%20app/User/9.Reset%20password.png" /> |
| <p align="center">**Email reset password**</p> | | |
| <img src="https://github.com/catalyn98/hollywood-records/blob/main/screenshoots%20app/User/10.Email%20reset%20password.png" /> | | |

# Admin panel screenshots
| <p align="center">**Dashboard**</p> | <p align="center">**Users list**</p> | <p align="center">**Orders list**</p> |
| ------------ | ------------ | ------------ |
| <img src="https://github.com/catalyn98/hollywood-records/blob/main/screenshoots%20app/Admin/1.Dashboard.png" /> |  <img src="https://github.com/catalyn98/hollywood-records/blob/main/screenshoots%20app/Admin/2.Users%20list.png" /> | <img src="https://github.com/catalyn98/hollywood-records/blob/main/screenshoots%20app/Admin/3.Orders%20list.png" /> |
| <p align="center">**Products list**</p> | <p align="center">**Add product**</p> | <p align="center">**Update product**</p> |
| <img src="https://github.com/catalyn98/hollywood-records/blob/main/screenshoots%20app/Admin/4.Products%20list.png" /> | <img src="https://github.com/catalyn98/hollywood-records/blob/main/screenshoots%20app/Admin/5.Add%20product.png" /> | <img src="https://github.com/catalyn98/hollywood-records/blob/main/screenshoots%20app/Admin/6.Update%20product.png" /> |
| <p align="center">**Categories products list**</p> | <p align="center">**Add category product**</p> | <p align="center">**Update category product**</p> |
| <img src="https://github.com/catalyn98/hollywood-records/blob/main/screenshoots%20app/Admin/7.Categories%20products list.png" /> | <img src="https://github.com/catalyn98/hollywood-records/blob/main/screenshoots%20app/Admin/8.Add%20category%20product.png" /> | <img src="https://github.com/catalyn98/hollywood-records/blob/main/screenshoots%20app/Admin/9.Update%20category%20product.png" /> |
| <p align="center">**Login**</p> | | |
| <img src="https://github.com/catalyn98/hollywood-records/blob/main/screenshoots%20app/Admin/10.Login.png" /> | | |

# Database structure
<img align="center" src="https://github.com/catalyn98/hollywood-records/blob/main/screenshoots%20app/Database/1.Structure%20of%20database.png" />
