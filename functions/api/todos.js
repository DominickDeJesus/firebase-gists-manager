const { db } = require("../util/admin");

exports.getAllTodos = async (req, res) => {
	// .collection(), .orderBy(), .get() are all FIRESTORE METHODS
	try {
		const data = await db
			.collection("todos")
			.orderBy("createdAt", "desc")
			.get();
		let todos = [];
		data.forEach((doc) => {
			todos.push({
				todoId: doc.id,
				// the .data() is a FIRESTORE METHOD that reveals the data for each document
				title: doc.data().title,
				description: doc.data().description,
				createdAt: doc.data().createdAt,
				user: doc.data().user,
			});
		});
		res.json(todos);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: err.code });
	}
};

exports.postOneTodo = async (req, res) => {
	try {
		console.log(res.locals.uid);
		const { title, description } = req.body;
		if (title === "") res.status(400).json("Title must not be empty");
		if (description === "")
			res.status(400).json("descritpion must not be empty");
		const todo = await db.collection("todos").add({
			title: title,
			description: description,
			createdAt: new Date().toISOString(),
			user: res.locals.uid,
		});
		res.json(todo);
	} catch (error) {
		res.status(500).json({ error: "Something went wrong" });
		console.error(error);
	}
};
