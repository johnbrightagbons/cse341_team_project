const request = require("supertest");
const app = require("../server.js");

describe("GET /products", () => {
  it("should return a list of products", async () => {
    const response = await request(app)
      .get("/products")
      .expect(401)
      .expect("Content-Type", /json/);

    // check if the body is inside array
    expect(response.body).toBeInstanceOf(Object);

    // check product required structure
    if (response.body.length > 0) {
      expect(response.body).toBe({ message: "Unauthorized" });
    }
  });
});

describe("GET /users", () => {
  it("should return a list of users", async () => {
    const response = await request(app)
      .get("/users")
      .expect(200)
      .expect("Content-Type", /json/);

    // check if the body is inside array
    expect(response.body).toBeInstanceOf(Array);

    // check user required structure
    if (response.body.length > 0) {
      const user = response.body[2];
      expect(user).toHaveProperty("_id");
      expect(user).toHaveProperty("fullname");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("password");
      expect(user).toHaveProperty("role");
    }
  });
});

describe("GET /payments", () => {
  it("should return a list of payments", async () => {
    const response = await request(app)
      .get("/payments")
      .expect(200)
      .expect("Content-Type", /json/);

    // check if the body is inside array
    expect(response.body).toBeInstanceOf(Array);

    // check payment required structure
    if (response.body.length > 0) {
      const payment = response.body[0];
      expect(payment).toHaveProperty("_id");
      expect(payment).toHaveProperty("userId");
      expect(payment).toHaveProperty("amount");
      expect(payment).toHaveProperty("method");
      expect(payment).toHaveProperty("status");
    }
  });
});

describe("GET /orders", () => {
  it("should return a list of orders", async () => {
    const response = await request(app)
      .get("/orders")
      .expect(200)
      .expect("Content-Type", /json/);

    // check if the body is inside array
    expect(response.body).toBeInstanceOf(Array);

    // check all orders required structure

    if (response.body.length > 0) {
      const order = response.body[0];
      expect(order).toHaveProperty("_id");
      expect(order).toHaveProperty("userId");
      expect(order).toHaveProperty("productId");
      expect(order).toHaveProperty("description");
      expect(order).toHaveProperty("totalPrice");
      expect(order).toHaveProperty("status");
    }
  });
});

afterEach(() => {
  jest.clearAllTimers();
});