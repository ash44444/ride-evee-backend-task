const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");

let token = "";
let userId = "";

describe("User CRUD APIs", () => {
  beforeAll(async () => {
    await User.deleteMany();

    // create a user to get token
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        name: "CRUD User",
        email: "crud@example.com",
        phone: "9876543210",
        password: "crudpass"
      });
    token = res.body.token;
  });

  it("should get all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should create a new user", async () => {
    const res = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "New User",
        email: "new@example.com",
        phone: "1112223333",
        password: "newpass"
      });

    expect(res.statusCode).toBe(201);
    userId = res.body._id;
  });

  it("should get a single user", async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", userId);
  });

  it("should update a user", async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated User" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Updated User");
  });

  it("should delete a user", async () => {
    const res = await request(app)
      .delete(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User deleted");
  });
});
