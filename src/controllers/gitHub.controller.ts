import { Request, Response } from 'express';
import { getRequest } from '../utils/api.utils';
import axios from 'axios';

export const getAllRepoBranches = async (
  req: Request,
  res: Response,
  owner: string,
  repo: string
) => {
  try {
    const response = await getRequest(`/repos/${owner}/${repo}/branches`);
    return parseBranchData(response);
  } catch (error: any) {
    console.log('Error:', error);
    return null;
  }
};

export const getAllRepoCommits = async (req: Request, res: Response) => {
  const { owner, repo } = req.query;
  if (typeof owner !== 'string' || typeof repo !== 'string') {
    return res.status(400).json({ error: 'Owner and repo name required!' });
  }
  const branches = await getAllRepoBranches(req, res, owner, repo);
  if (!branches) {
    return res.status(400).json({ error: 'Error getting branches' });
  }
  console.log('branches:', branches);
  let parsedData = [];
  for (let branchUrl of branches) {
    try {
      const response = await axios.get(branchUrl);
      // console.log("Response:", response.data);
      if (response.data) {
        parsedData.push(response.data?.commit?.author?.name);
      }
    } catch (error: any) {
      console.error(`error with this url: ${branchUrl}!!!!`, error);
    }
  }
  return res.status(200).json({ message: 'Success!!!', parsedData });
};

const parseBranchData = (branches: any[]): string[] => {
  const branchUrls: string[] = [];
  branches.forEach((item: any) => {
    const url = item?.commit?.url;
    if (url) {
      branchUrls.push(url);
    }
  });
  return branchUrls;
};
