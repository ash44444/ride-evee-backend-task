🌐 API Endpoints & Postman Testing
🔑 1. Signup (JWT)

Endpoint:
POST http://localhost:5000/api/auth/signup

Request Body (JSON):
{
"name": "Ashish",
"email": "ashish@example.com",
"phone": "9876543210",
"password": "password123"
}
✅ Expected Response (201):
{
"token": "JWT_TOKEN_HERE",
"user": {
"\_id": "64b...",
"name": "Ashish",
"email": "ashish@example.com",
"phone": "9876543210",
"role": "user",
"createdAt": "2025-08-30T09:00:00.000Z"
}
}
🔑 2. Login (JWT)

Endpoint:
POST http://localhost:5000/api/auth/login

Request Body:
{
"email": "ashish@example.com",
"password": "password123"
}
✅ Expected Response (200):

{
"token": "JWT_TOKEN_HERE",
"user": {
"\_id": "64b...",
"name": "Ashish",
"email": "ashish@example.com"
}
}
👉 Copy the token and set it as Postman Environment Variable token
(Authorization → Bearer {{token}})

📧 3. Send OTP

Endpoint:
POST http://localhost:5000/api/auth/otp/send

Request Body:
{
"email": "ashish@example.com"
}

✅ Expected Response (200):
{
"message": "OTP sent to email"
}
📩 OTP will be stored in DB (and sent via email if nodemailer is configured).
📧 4. Verify OTP

Endpoint:
POST http://localhost:5000/api/auth/otp/verify

Request Body:
{
"email": "ashish@example.com",
"otp": "123456"
}

✅ Expected Response (200):
{
"token": "JWT_TOKEN_HERE",
"user": {
"\_id": "64b...",
"email": "ashish@example.com"
}
}

👥 5. Get All Users (Protected)

Endpoint:
GET http://localhost:5000/api/users

Headers:
Authorization: Bearer {{token}}

✅ Expected Response (200):
[
{
"_id": "64b...",
"name": "Ashish",
"email": "ashish@example.com",
"phone": "9876543210"
}
]

👤 6. Get User by ID

Endpoint:
GET http://localhost:5000/api/users/<id>

✅ Response (200):
{
"\_id": "64b...",
"name": "Ashish",
"email": "ashish@example.com"
}

➕ 7. Create User (Protected)

Endpoint:
POST http://localhost:5000/api/users

Headers:
Authorization: Bearer {{token}}
Body:
{
"name": "New User",
"email": "new@example.com",
"phone": "1231231234",
"password": "newpass"
}

✅ Response (201):
{
"\_id": "64c...",
"name": "New User",
"email": "new@example.com"
}

✏️ 8. Update User (Protected)

Endpoint:
PUT http://localhost:5000/api/users/<id>

Headers:
Authorization: Bearer {{token}}

Body:
{
"name": "Updated User"
}
✅ Response (200):
{
"\_id": "64c...",
"name": "Updated User",
"email": "new@example.com"
}

❌ 9. Delete User (Protected)

Endpoint:
DELETE http://localhost:5000/api/users/<id>

Headers:
Authorization: Bearer {{token}}

✅ Response (200):
{
"message": "User deleted"
}
