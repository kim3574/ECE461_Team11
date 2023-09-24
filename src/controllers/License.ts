// License.ts

import { MetricParent } from '../helpers/MetricParent';

export class License extends MetricParent {
  private hasLicenseFile: boolean;

  constructor(someSharedProperty: string) {
    super(someSharedProperty, 'License', 'Dongwon Kim');
    this.hasLicenseFile = false;
  }

  fetchData(): Promise<any> {
    return Promise.resolve('Checked for license file');
  }

  calculateMetric(): boolean {
    return this.hasLicenseFile;
  }
}
