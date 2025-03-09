# Uber Project API Documentation

## Endpoints

### POST /user/register

#### Description
This endpoint is used to register a new user.

#### Request Body
The request body should be a JSON object containing the following fields:
- `fullname`: An object containing:
  - `firstName` (string, required): The first name of the user. Must be at least 3 characters long.
  - `lastName` (string, optional): The last name of the user. Must be at least 3 characters long.
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

Example:
```json
{
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

- **201 Created**
  - **Description**: User successfully registered.
  - **Body**: A JSON object containing the user details and a JWT token.
  - **Example**:
    ```json
    {
      "user": {
        "_id": "60c72b2f9b1d8e001c8e4b8e",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "socketId": null
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

- **400 Bad Request**
  - **Description**: Invalid input data.
  - **Body**: A JSON object containing the error details.
  - **Example**:
    ```json
    {
      "error": [
        {
          "msg": "First Name is required",
          "param": "fullname.firstName",
          "location": "body"
        },
        {
          "msg": "Invalid email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Password length is min 6",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

- **500 Internal Server Error**
  - **Description**: An error occurred on the server.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "error": "Internal server error"
    }
    ```

### POST /user/login

#### Description
This endpoint allows users to log in to their account.

#### Request Body
The request body should be a JSON object containing the following fields:
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

Example:
```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

#### Responses

- **200 OK**
  - **Description**: User successfully logged in.
  - **Body**: A JSON object containing the user details and a JWT token.
  - **Example**:
    ```json
    {
      "user": {
        "_id": "userId",
        "firstName": "John",
        "lastName": "Doe",
        "email": "user@example.com"
      },
      "token": "jwtToken"
    }
    ```

- **400 Bad Request**
  - **Description**: Invalid input data.
  - **Body**: A JSON object containing the error details.
  - **Example**:
    ```json
    {
      "error": [
        {
          "msg": "Invalid email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Password length is min 6",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

- **401 Unauthorized**
  - **Description**: Invalid email or password.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "error": "Invalid email or password"
    }
    ```

- **500 Internal Server Error**
  - **Description**: An error occurred on the server.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "error": "Internal server error"
    }
    ```

### GET /user/userProfile

#### Description
This endpoint retrieves the profile of the authenticated user.

#### Request Headers
- `Authorization` (string, required): The JWT token of the authenticated user. Must be in the format `Bearer <token>`.

#### Responses

- **200 OK**
  - **Description**: User profile retrieved successfully.
  - **Body**: A JSON object containing the user details.
  - **Example**:
    ```json
    {
      "user": {
        "_id": "userId",
        "firstName": "John",
        "lastName": "Doe",
        "email": "user@example.com"
      }
    }
    ```

- **401 Unauthorized**
  - **Description**: User is not authenticated.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "message": "You are not authenticated"
    }
    ```

- **404 Not Found**
  - **Description**: User not found.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "message": "User not found"
    }
    ```

- **500 Internal Server Error**
  - **Description**: An error occurred on the server.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "error": "Internal server error"
    }
    ```

### POST /user/logout

#### Description
This endpoint logs out the authenticated user.

#### Request Headers
- `Authorization` (string, required): The JWT token of the authenticated user. Must be in the format `Bearer <token>`.

#### Responses

- **200 OK**
  - **Description**: User successfully logged out.
  - **Body**: A JSON object containing a success message.
  - **Example**:
    ```json
    {
      "message": "Logout successfully"
    }
    ```

- **401 Unauthorized**
  - **Description**: User is not authenticated.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "message": "You are not authenticated"
    }
    ```

- **500 Internal Server Error**
  - **Description**: An error occurred on the server.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "error": "Internal server error"
    }
    ```
