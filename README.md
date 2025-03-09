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
