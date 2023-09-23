import {
    fetchRepositoryContributors,
    fetchRepositoryStars,
    fetchRepositoryForks,
    fetchFirstCommitTime,
  } from '../utils/RampUpAPI';
  
  export const calculateRampUp = async (owner: string, repo: string) => {
    try {
      // Fetch data from GitHub API
      const contributors = await fetchRepositoryContributors(owner, repo);
      const stars = await fetchRepositoryStars(owner, repo);
      const forks = await fetchRepositoryForks(owner, repo);
      const firstCommitTime = await fetchFirstCommitTime(owner, repo);
  
      const weights = {
        Contributors: 0.3,
        Stars: 0.2,
        Forks: 0.2,
        FirstCommit: 0.3,
      };
  
      // Calculate the ramp-up score
      let rampUpScore =
        weights.Contributors * contributors.length +
        weights.Stars * stars.length +
        weights.Forks * forks.length;
  
      if (firstCommitTime) {
        // Calculate the time it took for the first commit in milliseconds
        const currentTime = new Date().getTime();
        const firstCommitTimestamp = new Date(firstCommitTime).getTime();
        const timeDifference = currentTime - firstCommitTimestamp;
  
        // Normalize the time difference (0 to 1) and add it to the ramp-up score
        const maxTimeDifference = 365 * 24 * 60 * 60 * 1000; // Max time difference set to 1 year
        const normalizedTimeDifference = Math.min(timeDifference / maxTimeDifference, 1);
        rampUpScore += weights.FirstCommit * normalizedTimeDifference;
      }
      console.log('Ramp-Up Score:', rampUpScore);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const owner = "jonathandow"
  const repo = "ECE461_Team11"
  calculateRampUp(owner, repo);
  
