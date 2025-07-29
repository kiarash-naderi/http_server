import express from "express";
import {app as planRoutes} from "./routes/plan.routs"
import {app as userRoutes} from "./routes/user.rout"


export const app = express();

app.use(express.json());


if (process.env.NODE_ENV !== "Test") {
    app.use((req, res, next) => {
        console.log(req.method, req.url);
        next();
    });
}


app.use("/plan", planRoutes);
app.use(userRoutes);

app.use((req, res) => {
    res.status(404).send({ message: "not found" });
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
