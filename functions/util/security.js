const { admin } = require("./admin");
const { Octokit } = require("@octokit/rest");

exports.checkUser = async (req, res, next) => {
	try {
		const decodedToken = await admin.auth().verifyIdToken(req.body.tokenId);
		res.locals.uid = decodedToken.uid;
		next();
	} catch (error) {
		// Handle error
		res.json(error);
	}
};

exports.checkGithub = async (req, res, next) => {
	const tokenId = req.headers.authorization;
	try {
		if (!tokenId) throw Error("Not authorized");

		const octokit = new Octokit({
			auth: tokenId,
			userAgent: "firebase-gist 1.0.0",
		});
		res.locals.octokit = octokit;
		next();
	} catch (error) {
		res.json(error.message);
	}
};
