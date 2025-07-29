import request from "supertest";
import { app } from "../src/api";
import { title } from "process";


describe("Plan", () => {
    const login = async () => {
        const { body: user } = await request(app)
            .post("/login")
            .send({ username: "admin", password: "admin" })
            .expect(200)
        return user;
    }

    describe("Create", () => {

        it("should fail if we did not login", async () => {
            await request(app).post("/plan").expect(401);
        });

        it("should create a plan if we are logged in", async () => {
            const user = await login();
            const { body: plan } = await request(app)
                .post("/plan")
                .set("Authorization", user.id)
                .send({
                    title: "Oromie",
                    description: "Oromie is a nice place",
                })
                .expect(200);
            expect(plan.title).toBe("Oromie");
        });

        it("should send badrequest if title is not provided", async () => {
            const user = await login()
            await request(app)
                .post("/plan")
                .set("Authorization", user.id)
                .send({
                    description: "Oromie is a nice place",
                })
                .expect(400);

        })
    });

    describe("Read", () => {
        it("should read the plan", async () => {
            const user = await login();

            const title = "Oromie"
            const { body: plan } = await request(app)
                .post("/plan")
                .set("Authorization", user.id)
                .send({
                    title,
                    description: "Oromie is a nice place",
                })
                .expect(200);
            const {body: resultPlan} =  await request(app)
                .get("/plan/" + plan.id)
                .expect(200);

            expect(resultPlan.title).toBe(title);
        });
    });
});
