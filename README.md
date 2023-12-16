# Media Inventory System

## Overview
A media inventory system with a React-based front-end and Spring Boot-based back-end.

## Prerequisites
* Node.js and npm (latest version).
* Java Development Kit (JDK), version 11 or above.
* A MongoDB instance, accessible locally or remotely.




## Back-End Setup

### Environment Setup File Structure Visual 
Back-End/

├── demo/

│ ├── src/

│ │ ├── main/

│ │ │ ├── resources/

│ │ │ │ ├── .env

│ │ │ │ └── application.properties

### Environment Variables
First, create a `.env` file inside the `Back-End/demo/src/main/resources/` directory if it does not already exist. Then,
configure the following environment variables in your `.env` file:
```properties
MONGO_DATABASE=your_mongodb_database
MONGO_USER=your_mongodb_username 
MONGO_PASSWORD=your_mongodb_password 
MONGO_CLUSTER=your_mongodb_cluster_url 
GOOGLE_BOOKS_API_KEY=your_google_books_api_key 
```
### Configuration
Next, configure the `application.properties` file inside the `Back-End/demo/src/main/resources/` directory using the environment variables you
defined in the `.env` file:

There is also an `env-example` file for refrence:

```properties
google.books.api.key=${env.GOOGLE_BOOKS_API_KEY}
spring.data.mongodb.database=${env.MONGO_DATABASE}
spring.data.mongodb.uri=mongodb+srv://${env.MONGO_USER}:${env.MONGO_PASSWORD}@${env.MONGO_CLUSTER}
```

### Starting the Server
1. Locate `InventoryV2Application.java` file.
2. Start the server using your IDE(e.g., Intellij IDEA, Eclipse, Visual Studio Code.)
3. Access the server at `http://localhost:8080)http://localhost:8080` <br></br>
Note : Ensure the `.env` file is saved before starting the server


### Front-End Setup

The front-end part of the project is built with [React](https://reactjs.org/). To get it up and running on your local machine, follow these steps:

#### Installing Dependencies

Navigate to the front-end directory and install the necessary npm packages:

```sh
cd Front-End
npm install
```
## What I Learned

This project was an intensive learning experience that helped me to develop my skills in several key areas:

- **Full-Stack Development**: Mastered the integration of a React.js front-end with a Java Spring Boot back-end to create a cohesive full-stack application.
- **RESTful API Consumption**: Utilized the Google Books API to fetch and display real-time book information, which taught me about API integration and data handling in a live environment.
- **State Management**: Learned to efficiently manage application state, allowing for smooth updates and interactions within the dynamic inventory management table.
- **Performance Optimization**: Implemented an optimized dynamic table for inventory management, leading to a significant improvement in the efficiency of data processing tasks.

Through this project, I've learned the importance of clean code, user-centric design, and the thoughtful integration of various technologies to create an efficient and effective software solution.
