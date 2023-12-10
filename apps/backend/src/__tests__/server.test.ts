import supertest from "supertest";
import app from "../app";

describe("Server", () => {
  // it("health check returns 200", async () => {
  //   await supertest(app)
  //     .get("/status")
  //     .expect(200)
  //     .then((res) => {
  //       expect(res.ok).toBe(true);
  //     });
  // });

  it("message endpoint says hello", async () => {
    await supertest(app)
      .get("/message/jared")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ message: "hello jared" });
      });
  });
});
