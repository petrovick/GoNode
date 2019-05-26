const request = require("supertest");
const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("Should be able to authenticate with valid credentials", async () => {
    const user = await factory.create("User", { password: "123123" });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "123123"
      });
    expect(response.status).toBe(200);
  });

  it("Shold not be able to authenticate with invalid credentials", async () => {
    const user = await factory.create("User", {
      password: "123123"
    });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "123456"
      });
    expect(response.status).toBe(401);
  });

  it("It Should return jwt token when authenticated", async () => {
    const user = await factory.create("User", { password: "123123" });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "123123"
      });
    expect(response.body).toHaveProperty("token");
  });

  it("It Should be able to access private route when autheticated", async () => {
    const user = await factory.create("User");
    console.log(user);
    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it("It Should not be able to access private route when not autheticated", async () => {
    const response = await request(app).get("/dashboard");

    expect(response.status).toBe(401);
  });

  it("It Should not be able to access private route when not autheticated", async () => {
    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", "Bearer 123123");

    expect(response.status).toBe(401);
  });
});
