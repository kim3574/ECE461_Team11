import { calculateRampUp } from '../src/controllers/RampUp';
import { correctness } from '../src/controllers/correctness';
import { 
  getAllRepoCommits,
  getAllPullRequests,
  getAllClosedIssues,
  calculateBusFactor
} from '../src/controllers/BusFactor';
jest.mock('../src/utils/RampUpAPI', () => ({
  fetchRepositoryContributors: jest.fn(() => Promise.resolve([])),
  fetchRepositoryStars: jest.fn(() => Promise.resolve([])),
  fetchRepositoryForks: jest.fn(() => Promise.resolve([])),
  fetchFirstCommitTime: jest.fn(() => Promise.resolve('2023-09-20T12:00:00Z')),
}));

describe('calculateRampUp', () => {
  it('calculates the ramp-up score correctly', async () => {
    const mockResponse: any = {
      json: jest.fn(),
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };

    const {
      fetchRepositoryContributors,
      fetchRepositoryStars,
      fetchRepositoryForks,
      fetchFirstCommitTime,
    } = require('../src/utils/RampUpAPI');
    await calculateRampUp(
      { query: { owner: 'github_owner', repo: 'repository_name' } } as any,
      mockResponse as any,
      {} as any
    );
    expect(fetchRepositoryContributors).toHaveBeenCalledWith('github_owner', 'repository_name');
    expect(fetchRepositoryStars).toHaveBeenCalledWith('github_owner', 'repository_name');
    expect(fetchRepositoryForks).toHaveBeenCalledWith('github_owner', 'repository_name');
    expect(fetchFirstCommitTime).toHaveBeenCalledWith('github_owner', 'repository_name');
    expect(mockResponse.json).toHaveBeenCalledWith({ rampUpScore: expect.any(Number) });
  });
});

describe('correctness', () => {

  it('should return a score of 0 if the repository does not exist', async () => {
    const checker = new correctness('DevT9', 'ThisRepoDoesNotExist');
    const score = await checker.check();
    expect(score).toBe(0);
  });

  it('should return a score greater than 0.8 if the repository has no errors and has a test suite', async () => {
    const checker = new correctness("PurdueIEEE", "IEEE-Website");
    const score = await checker.check();
    expect(score).toBeGreaterThan(0.8);
  });

  it('should return a score greater than 0.48 if the repository has no errors but doesnt have a test suite', async () => {
    const checker = new correctness('PurdueIEEE', 'boilerbooks');
    const score = await checker.check();
    expect(score).toBeGreaterThan(0.48);
  });
  it ('should return a score less than 0.48 because of errors', async () => {
    const checker = new correctness('DevT9', 'TestRepo');
    const score = await checker.check();
    expect(score).toBeLessThan(0.48);
  });
});

jest.mock('..src/controllers/BusFactor', () => ({
  getAllRepoCommits: jest.fn(() => Promise.resolve(new Map([['helloAuthor', 5], ['author2', 3]]))),
  getAllPullRequests: jest.fn(() => Promise.resolve(new Map([['helloAuthor', 2], ['author2', 1]]))),
  getAllClosedIssues: jest.fn(() => Promise.resolve(new Map([['helloAuthor', 1], ['author2', 6]]))),
}));

describe('calculateBusFactor', () => {
  it('calculates the bus factor correctly', async () => {
    const mockResponse: any = {
      json: jest.fn(),
      status: jest.fn(() => mockResponse)
    };

    await calculateBusFactor(
      { query: { owner: 'github_owner', repo: 'repository_name' } } as any,
      mockResponse as any
    );

    expect(getAllRepoCommits).toHaveBeenCalledWith('github_owner', 'repository_name');
    expect(getAllPullRequests).toHaveBeenCalledWith('github_owner', 'repository_name');
    expect(getAllClosedIssues).toHaveBeenCalledWith('github_owner', 'repository_name');

    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        busFactor: expect.any(Number),
        totalContributors: expect.any(Number),
        sortedContributors: expect.any(Array)
      })
    );
  });
});

