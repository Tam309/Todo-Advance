import { expect } from "chai";
import { initializeTestDb, insertUser } from "./helpers/test.js";
import { startServer, stopServer } from "./testSetup.js";
const baseUrl = "http://localhost:3001";

describe("Task API Tests", function () {
  before(async function () {
    await startServer();
    await initializeTestDb();
  });

  after(async function () {
    await stopServer();
  });
});

describe("GET task", () => {
  it("should get all task", async () => {
    const response = await fetch(baseUrl);
    const data = await response.json();

    expect(response.status).to.equal(200);
    expect(data).to.be.an("array").that.is.not.empty;
    expect(data[0]).to.include.all.keys("id", "description");
  });
});

describe("DELETE task", () => {
  it("should delete a task", async () => {
    const response = await fetch(`${baseUrl}/delete/1`, {
      method: "DELETE",
    });
    const data = await response.json();

    expect(response.status).to.equal(200);
    expect(data.message).to.be.an("string");
  });
});

describe("POST task", () => {
  it("should post a task", async () => {
    const response = await fetch(`${baseUrl}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: "New task" }),
    });
    const data = await response.json();

    expect(response.status).to.equal(201);
    expect(data).to.include.all.keys("id");
    expect(data.message).to.be.an("string");
  });

  it("should not add a task without description", async () => {
    const response = await fetch(`${baseUrl}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: null }),
    });
    const data = await response.json();

    expect(response.status).to.equal(400);
    expect(data.message).to.be.an("string");
    expect(data).to.include.all.keys("message");
  });
});

// describe("POST register", () => {
//     const email = "testmail_unique3@gmail.com";
//     const password = "testpassword";

//     beforeEach(async () => {
//         await initializeTestDb();  // Clear database between tests to avoid duplicates
//     });

//     it("should register with valid email and password", async () => {
//         const response = await fetch(`${baseUrl}/user/register`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email, password }),
//         });

//         let data;
//         try {
//             data = await response.json();  // Attempt to parse JSON
//         } catch (error) {
//             console.error("Failed to parse JSON. Raw response:", await response.text());
//             throw error;  // Re-throw to allow test failure with context
//         }

//         expect(response.status).to.equal(201);
//         expect(data).to.include.all.keys("id", "email");
//     });
// });

describe("POST register", () => {
  const email = "testmail_unique8@gmail.com";
  beforeEach(async () => {
      await initializeTestDb(); // Clear database between tests to avoid duplicates
  });

  it("should register with valid email and password", async () => {
      const password = "testpassword";
      const response = await fetch(`${baseUrl}/user/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
      });

      expect(response.status).to.equal(201);

      let data;
      try {
          data = await response.json();
      } catch (error) {
          console.error(
              "Failed to parse JSON response during valid registration:",
              {
                  status: response.status,
                  headers: response.headers.raw(),
                  raw: await response.text() // Log the raw response
              }
          );
          throw error;
      }

      expect(data).to.include.all.keys("id", "email");
  });

  it("should not post a user with less than 8 character password", async () => {
      const password = "short";
      const response = await fetch(`${baseUrl}/user/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }), // password too short
      });

      // Check status first to handle non-JSON errors
      expect(response.status).to.equal(400);

      let data;
      try {
          data = await response.json();
      } catch (error) {
          console.error("Failed to parse JSON response:", {
              status: response.status,
              headers: response.headers.raw(),
              raw: await response.text() // Log raw response if parsing fails
          });
          throw error;
      }

      expect(data).to.have.property("error");
      expect(data).to.have.all.keys('error')
  });
});


describe("POST login", () => {
  const email = "testmail2@gmail.com";
  const password = "test";
  insertUser(email, password);
  it("should login with valid credentials", async () => {
    const response = await fetch(`${baseUrl}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    expect(response.status).to.equal(200);
    expect(data).to.include.all.keys("id", "email", "token");
  });
});
