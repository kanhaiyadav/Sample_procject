import e from "express";
import './Config/mongoose.js';
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import router from "./Router/index.js";
const app = e();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin like mobile apps or curl requests
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        "The CORS policy for this site does not allow access from the specified origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(e.json());
app.use(e.urlencoded({ extended: true }));

app.use('/', router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
