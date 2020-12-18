const { Octokit } = require("@octokit/rest");
const GITHUB_TOKEN = require("firebase-functions").config().github.token;

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
  userAgent: "firebase-gist 1.0.0",
});

exports.getAllGists = async (req, res) => {
  try {
    const gists = await octokit.gists.listForUser({
      username: "dominickdejesus",
    });
    res.json(gists);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getGist = async (req, res) => {
  try {
    const gist = await octokit.gists.get({
      gist_id: req.params.id,
    });
    res.json(gist);
  } catch (error) {
    console.log(error.message);
  }
};

exports.createGist = async (req, res) => {
  try {
    const { desc, filename, fileContent } = req.body;
    const gist = await octokit.gists.create(req.body);
    res.json(gist);
  } catch (error) {
    console.log(error.message);
  }
};
