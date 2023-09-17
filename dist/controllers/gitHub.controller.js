"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRepoCommits = void 0;
const api_utils_1 = require("../utils/api.utils");
const fetchRepoCommits = async (req, res) => {
    const { owner, repo } = req.params;
    console.log('owner:', owner);
    console.log('repo:', repo);
    try {
        const commits = await (0, api_utils_1.getRequest)(`/repos/${owner}/${repo}/commits`);
        res.status(200).json(commits);
    }
    catch (error) {
        console.error('Error fetching commits:', error);
        res.status(500).json({ error: error.message });
    }
};
exports.fetchRepoCommits = fetchRepoCommits;
