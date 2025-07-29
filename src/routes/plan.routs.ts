import { Router } from "express";
import { users } from "./user.rout";
import { isNonEmptyString } from "../utility/non-empty-string";


interface Plan {
    id: number;
    title: string;
    description: string;
}

const plans: Plan[] = []
export const app =  Router();


app.post("/", (req, res) => {

    const userId = req.headers["authorization"]

    const loggedInUser = users.find((x) => x.id === userId);
    if (!loggedInUser) {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    const { title, description } = req.body;

    // validation
    if (!isNonEmptyString(title)) {
        res.status(400).send({ message: "tittle should be string and non empty" });
        return;
    }

    // create plan
    const plan = {
        id: plans.length + 1,
        title,
        description: description || "",
    };

    plans.push(plan);
    res.status(200).send(plan)

    const user = users.find(
        (x) => x.username === req.body.username && x.password === req.body.password
    );

    if (user === undefined) {
        res.status(401).send({ message: "Invalid username or password" });
        return;
    }

    res.status(200).send(user)
});

app.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.status(400).send({ message: "id should be a number" });
        return;
    }

    const plan = plans.find((plan) => plan.id === id);
    if (plan === undefined) {
        res.status(404).send({ message: "plan not found" });
        return;
    }

    res.status(200).send(plan);

});