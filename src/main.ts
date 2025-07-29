import { app } from "./api";

const PORT = 3000
app.listen(PORT, () => {
  console.log("Listening on Port" + PORT)
});