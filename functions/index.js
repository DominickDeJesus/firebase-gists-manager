const functions = require("firebase-functions");
const cors = require("cors");
const app = require("express")();

app.use(cors());

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

exports.api = functions.https.onRequest(app);
