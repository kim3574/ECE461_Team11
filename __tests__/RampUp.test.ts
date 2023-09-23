import { calculateRampUp } from '../src/controllers/RampUp';

describe('calculateRampUp', () => {
  it('calculates the ramp-up score correctly', async () => {
    // Mock API calls 
    const mockFetchRepositoryContributors = jest.fn(() => Promise.resolve([]));
    const mockFetchRepositoryStars = jest.fn(() => Promise.resolve([]));
    const mockFetchRepositoryForks = jest.fn(() => Promise.resolve([]));
    const mockFetchFirstCommitTime = jest.fn(() => Promise.resolve('2023-09-20T12:00:00Z'));

    // Mock the API functions to return the desired values
    jest.mock('../src/utils/RampUpAPI', () => ({
      fetchRepositoryContributors: mockFetchRepositoryContributors,
      fetchRepositoryStars: mockFetchRepositoryStars,
      fetchRepositoryForks: mockFetchRepositoryForks,
      fetchFirstCommitTime: mockFetchFirstCommitTime,
    }));

    // Call the function to be tested
    await calculateRampUp('github_owner', 'repository_name');

    expect(mockFetchRepositoryContributors).toHaveBeenCalledWith('github_owner', 'repository_name');
    expect(mockFetchRepositoryStars).toHaveBeenCalledWith('github_owner', 'repository_name');
    expect(mockFetchRepositoryForks).toHaveBeenCalledWith('github_owner', 'repository_name');
    expect(mockFetchFirstCommitTime).toHaveBeenCalledWith('github_owner', 'repository_name');
  });
});
