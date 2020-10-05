import express from "express";
import path from "path";
import authRoute from "./routes/auth.route";
import Model from "./models/index";

const app = express();
const customeView = path.resolve(__dirname, "..", "views");

app.set("views", customeView);
app.set("view engine", "ejs");

// Static assets
app.use(express.static(path.join(__dirname, "..", "assets")));

// Setup route
app.use(authRoute);

app.get("/", async (req, res, next) => {
	const user = await Model.User.findAll();
	console.log(user);

	res.render("samples/sample-page");
});

export default app;
