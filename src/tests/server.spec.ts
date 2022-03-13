import app from "../server";
import supertest from "supertest";

const request = supertest(app);

describe("Server ,Test endpoint starting response", () => {
  it("getting a code represents the api endpoint success", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});
