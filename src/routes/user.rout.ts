import { Router } from "express";
import { v4 } from "uuid";
import { isNonEmptyString } from "../utility/non-empty-string";


type userRole = "Admin" | "Representative" | "Normal";
interface User {
    id: string,
    username: string,
    password: string,
    role: userRole
}

export const users: User[] = [
    { id: v4(), username: "admin", password: "admin", role: "Admin" }
]
export const app = Router();

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!isNonEmptyString(username)) {
        res
            .status(400)
            .send({ message: "username should be string and non empty" });
        return;
    }

    if (!isNonEmptyString(password)) {
        res
            .status(400)
            .send({ message: "password should be string and non empty" });
        return;
    }

    const user = users.find(
        (x) => x.username === username && x.password === password
    );

    if (user === undefined) {
        res.status(401).send({message: "Invalid username or password"});
        return;
    }

    res.status(200).send(user);
});
