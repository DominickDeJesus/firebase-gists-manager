const { admin } = require("./admin");

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
