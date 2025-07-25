import express from "express";

const app = express();

// برای اینکه بتونیم body به‌صورت JSON بخونیم
app.use(express.json());

//  Middleware عمومی برای لاگ گرفتن از هر درخواست
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next(); // ادامه مسیر
});

//  GET /hello?name=Ali
app.get("/hello", (req, res) => {
  const name = req.query.name || "World";
  res.json({ message: `Hello ${name}` });
});

//  GET /hello/:name
app.get("/hello/:name", (req, res) => {
  const nameFromParam = req.params.name;
  res.json({ message: `Hello ${nameFromParam}` });
});

// POST /hello (با body)
app.post("/hello", (req, res) => {
  const userData = req.body;
  if (!userData.name) {
    return res.status(400).json({ error: "Name is required" });
  }
  res.json({ message: `Hello ${userData.name}` });
});

// Middleware اختصاصی برای مسیر خاص
app.get(
  "/hello",
  (req, res, next) => {
    console.log("Query received:", req.query);
    next();
  },
  (req, res) => {
    // این بخش هندلر اصلیه (در بالا تعریف شده برای /hello)
  }
);

//هندل کردن مسیرهای ناشناخته (404)
app.use((req, res) => {
  res.status(404).send("Endpoint not found");
});

//روشن کردن سرور
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
