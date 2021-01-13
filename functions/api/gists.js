exports.getAllGists = async (req, res) => {
	try {
		const gists = await res.locals.octokit.gists.list();
		res.json(gists);
	} catch (error) {
		console.log(error.message);
	}
};

exports.getGist = async (req, res) => {
	try {
		const gist = await res.locals.octokit.gists.get({
			gist_id: req.params.id,
		});
		res.json(gist);
	} catch (error) {
		console.log(error.message);
	}
};

exports.createGist = async (req, res) => {
	try {
		const gist = await res.locals.octokit.gists.create(req.body);
		res.json(gist);
	} catch (error) {
		console.log(error.message);
	}
};
