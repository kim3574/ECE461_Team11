
import { MetricParent } from '../helpers/MetricParent';
import * as responsivenessApi from '../utils/responsivenessApi';

export class Responsiveness extends MetricParent {
  private responseTime: number;

  constructor(someSharedProperty: string, responseTime: number) {
    super(someSharedProperty, 'Responsive Maintainer', 'Dongwon Kim');
    this.responseTime = responseTime;
  }

  // Implement the abstract method from the parent class
  calculateMetric(): number {
    const result = this.commonCalculation(this.responseTime);
    return result;
  }


  async fetchData(): Promise<any> {
    try {
      const comments = await responsivenessApi.fetchIssueComments('owner', 'repo', 1);
      if (comments) {
        // Process comments to calculate responsiveness
      }
      return Promise.resolve('Fetched and processed data for Responsive Maintainer');
    } catch (error) {
      console.error('Error fetching data:', error);
      return Promise.reject(error);
    }
  }
}