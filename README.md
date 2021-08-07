# NodeJS JWT Authentication

This project is an simple example of JWT authentication. Once an user registers they get JWT token which they can use for private app routes that cannot be accessed without token. 

### Tools used
- Node JS
- Express JS
- Express validator
- Bcrypt ^5.0.1
- dotenv
- Jsonwebtoken ^8.5.1

## API routes

- User signup localhost:${PORT)/auth/signup
- Login localhost:${PORT)/auth/login
- Get all userdata localhost:${PORT)/auth/all
- Get public recipes (dosenot require token) 
  localhost:${PORT)/recipes/public
- Get private recipes (require token)
  localhost:${PORT)/recipes/private
  
The .env file requires the following variable.

SECRET = < token-secret here in one string ... >

