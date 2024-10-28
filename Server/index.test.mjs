import { expect } from "chai";
const baseUrl = "http://localhost:3001"

describe("GET task", () => {
    it("should get all task", async () => {
        const response = await fetch(baseUrl);
        const data = await response.json();

        expect(response.status).to.equal(200);
        expect(data).to.be.an("array").that.is.not.empty;
        expect(data[0]).to.include.all.keys("id", "description");
    });
});

describe("PUT task", () => {
    it("should edit a task", async () => {
        const response = await fetch(`${baseUrl}/edit/60`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "task": "Updated task" }),
        });
        const data = await response.json();

        expect(response.status).to.equal(200);
        expect(data.message).to.be.an("string");
    });
})

describe("DELETE task", () => {
    it("should delete a task", async () => {
        const response = await fetch(`${baseUrl}/delete/60`, {
            method: "DELETE",
        });
        const data = await response.json();

        expect(response.status).to.equal(200);
        expect(data.message).to.be.an("string");
    });
})

describe("POST task", () => {
    it("should post a task", async() => {
        const response = await fetch(`${baseUrl}/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "description": "New task" }),
        });
        const data = await response.json();

        expect(response.status).to.equal(201);
        expect(data).to.include.all.keys("id");
        expect(data.message).to.be.an("string");
    })

    it("should not add a task without description", async() => {
        const response = await fetch(`${baseUrl}/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "description": null }),
        });
        const data = await response.json();

        expect(response.status).to.equal(500);
        expect(data.message).to.be.an("string");
        expect(data).to.include.all.keys("message")
    })
})

describe("POST register", () => {
    const email = 'test@gmail.com';
    const password = 'test';
  
    it("should register with valid email and password", async () => {
      const response = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      console.log("Raw response:", response);
  
      const data = await response.json().catch((error) => {
        console.error("JSON parse error:", error);
        throw error;  // Ensure we see parse errors directly
      });
  
      console.log("Parsed data:", data);
  
      expect(response.status).to.equal(201);
      expect(data).to.include.all.keys("id", "email", "message");
      expect(data.message).to.be.a("string");
    });
  });