const functions = require("firebase-functions");
const cors = require("cors");
const app = require("express")();

app.use(cors());

const { getAllTodos, postOneTodo } = require("./api/todos");
const { loginUser, signUpUser } = require("./api/users");

//Todos
app.get("/todos", getAllTodos);
app.post("/todos", postOneTodo);

//Users
app.post("/login", loginUser);
app.post("/signup", signUpUser);

exports.api = functions.https.onRequest(app);
