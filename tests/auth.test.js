const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");
const Otp = require("../src/models/Otp");

let token = "";
let testEmail = "jestuser@example.com";

describe("Auth APIs", () => {
  beforeAll(async () => {
    await User.deleteMany();
    await Otp.deleteMany();
  });

  it("should signup a user", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        name: "Jest User",
        email: testEmail,
        phone: "1234567890",
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("should login a user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: testEmail,
        password: "password123"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should send OTP to email", async () => {
    const res = await request(app)
      .post("/api/auth/otp/send")
      .send({ email: testEmail });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("OTP sent to email");
  });

  it("should verify OTP", async () => {
    const otpRecord = await Otp.findOne({ email: testEmail });

    const res = await request(app)
      .post("/api/auth/otp/verify")
      .send({ email: testEmail, otp: otpRecord.otp });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
