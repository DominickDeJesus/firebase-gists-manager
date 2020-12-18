const functions = require("firebase-functions");
const cors = require("cors");
const app = require("express")();

app.use(cors());
const { getAllGists, createGist, getGist } = require("./api/gists");
const { getAllTodos, postOneTodo } = require("./api/todos");
const { loginUser, signUpUser, resetPassword } = require("./api/users");
const { checkUser } = require("./util/security");
//Todos
app.get("/todos", checkUser, getAllTodos);
app.post("/todos", checkUser, postOneTodo);

//Users

app.post("/login", loginUser);
app.post("/signup", signUpUser);
app.post("/password/reset", resetPassword);

//gists
app.post("/gists", createGist);
app.get("/gists", getAllGists);
app.get("/gists/:id", getGist);
exports.api = functions.https.onRequest(app);
