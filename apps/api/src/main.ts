// * Express
import * as express from "express";

// * Middleware
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import errorHandler from "errorhandler";
import morgan from "morgan";
import cors from "cors";

// * Routes
import indexRouter from "./routes/index";

// * Environment
import { environment } from "./environments/environment";

// * Bootstrap Express
const app = express();

// * Configure port
const port = environment.port;
app.set("port", port);

// * Log requests, using an appropriate formatter by env
const devEnv = !environment.production;
app.use(morgan(devEnv ? "dev" : "combined"));

// * Include request parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// * Enable CORS policy
app.use(cors());

// * Show nicer errors in dev mode
if (devEnv) app.use(errorHandler());

// * Wire up routes
app.use("/api/", indexRouter);

// * Boot the HTTP server
app.listen(port, () => {
  console.log(`App server running on port ${port}`);
});
