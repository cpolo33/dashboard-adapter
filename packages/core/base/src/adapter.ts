import { DashboardAsset, Platform } from './types';

export default abstract class Adatper {
  abstract readonly platform: Platform;

  abstract fetchDashboard(address: string) : Promise<DashboardAsset[]>;
  fetchDashboards(addresses: string[]) : Promise<DashboardAsset[][]> {
    const promises = addresses.map((address) => this.fetchDashboard(address));
    return Promise.all(promises);
  }
}
