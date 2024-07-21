import { app } from "./app.js";
import { connectDB } from "./config/database.js";

const port = process.env.port || 5000;

connectDB();


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


