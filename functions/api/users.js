const { db } = require("../util/admin");
const config = require("../config");
const firebase = require("firebase");

firebase.initializeApp(config);

exports.loginUser = (req, res) => {
	const { email, password } = req.body;
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((data) => {
			return data.user.getIdToken();
		})
		.then((token) => {
			return res.json({ token });
		})
		.catch((error) => {
			console.error(error);
			return res
				.status(403)
				.json({ general: "wrong credentials, please try again" });
		});
};

exports.signUpUser = (req, res) => {
	const newUser = {
		email: req.body.email.toLowerCase(),
		name: req.body.name.toLowerCase(),
		password: req.body.password,
	};
	let token, userId;

	// check if user exists in the users collection in Firestore by using the .doc() method
	db.doc(`/users/${newUser.email}`)
		.get()
		.then((doc) => {
			//.exists is a FIRESTORE method
			if (doc.exists) {
				return res.status(400).json({ email: "this email is already taken" });
			} else {
				return firebase
					.auth()
					.createUserWithEmailAndPassword(newUser.email, newUser.password);
			}
		})
		.then((data) => {
			userId = data.user.uid;
			return data.user.getIdToken();
		})
		.then((idtoken) => {
			token = idtoken;
			// make object of fields we'd like to add to the user documents in Firestore
			const userCredentials = {
				name: newUser.name,
				email: newUser.email,
				createdAt: new Date().toISOString(),
				userId,
			};
			// Create a user in the users collection in Firestore
			return db.doc(`/users/${newUser.name}`).set(userCredentials);
		})
		.then(() => {
			return res.status(201).json({ token });
		})
		.catch((err) => {
			console.error(err);
			if (err.code === "auth/email-already-in-use") {
				return response.status(400).json({ email: "Email already in use" });
			} else {
				return res
					.status(500)
					.json({ general: "Something went wrong, please try again" });
			}
		});
};
