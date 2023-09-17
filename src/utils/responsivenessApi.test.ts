// src/utils/responsivenessApi.test.ts

import * as responsivenessApi from './responsivenessApi';
import { getRequest } from './api.utils';

// Mock the getRequest function from api.utils.ts
jest.mock('./api.utils');

describe('Responsiveness API Utilities', () => {
  it('fetchIssueComments should call getRequest with correct endpoint', async () => {
    await responsivenessApi.fetchIssueComments('owner', 'repo', 1);
    expect(getRequest).toHaveBeenCalledWith('/repos/owner/repo/issues/1/comments');
  });

  // Add similar tests for other utility functions
});
