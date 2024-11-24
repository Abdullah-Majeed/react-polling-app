# Polling App

The **Polling App** is a React-based application designed for creating, managing, and participating in polls. Follow these steps to set up and run the project locally.

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org) (v14 or later)
- npm (Node Package Manager)
- MongoDB instance (local or cloud)
- [TinyPNG API Key](https://tinypng.com/developers)

---

## 1. Clone the Repository

Clone the repository to your local machine:

```bash
    git clone https://github.com/Abdullah-Majeed/react-polling-app
```
## 2. Steps to run backend server

## 2.1 Enter command on cmd terminal
```bash
    cd react-polling-app
    cd backend
```

## 2.2 Create .env File in root of backend folder and add thsee configuration
```bash
    PORT_NO=YOUR_PORT_NUMBER # Default: 4000
    MONGO_URI=YOUR_DATABASE_URI
    SECRET_KEY=YOUR_JSON_WEB_TOKEN_SECRET_KEY
    TINIFY_KEY=YOUR_TINY_PNG_API_KEY
```
    
## 2.3 Run command to install packages
```bash
    npm install
```

## 2.4 Run command to start local server on your machine
```bash
    npm run dev
```

## 3. Steps to run React Application

## 3.1 Enter command on cmd terminal
```bash
    cd react-polling-app
    cd frontend
    cd polling-application
```
## 3.2 Run command to install packages
```bash
    npm install
```
## 3.2 Run command to install packages
```bash
    npm install
```
## 3.3 Run command to start REACT APP on your machine PORT 5173
```bash
    npm run dev
```


