const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to check if it's working hours (Monday to Friday, 9 to 17)
const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hourOfDay = now.getHours();

  // Check if it's a weekday and between 9 and 17
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
    next();
  } else {
    res.send(
      "Sorry, the web application is only available during working hours (Monday to Friday, 9 to 17)."
    );
  }
};

// Use Pug as the view engine
app.set("view engine", "pug");

// Serve static files (CSS)
app.use(express.static("public"));

// Apply working hours middleware to all routes
app.use(workingHoursMiddleware);

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
