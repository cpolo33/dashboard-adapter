import { DashboardAsset } from '@sonarwatch/dashboard-adapter-base';

export const HubbleAdapterId = 'hubble';
export const HubbleAdapterName = 'Hubble Proctol';

export const hubblePlatform = {
  id: 'hubble',
  name: 'Hubble Protocol',
  description: 'Mint USDH stablecoin at 0% interest against multiple types of collateral',
  logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HBB111SCo9jkCejsZfz8Ec8nH7T6THF8KEKSnvwT6XK6/logo.svg',
  discord: 'https://discord.gg/d44A8WvK',
  twitter: 'https://twitter.com/hubbleprotocol',
  website: 'https://hubbleprotocol.io/',
} as Platform;

export type Platform = {
  id: string,
  name: string,
  description: string,
  logoURI: string,
  discord?: string,
  twitter?: string,
  website?: string,
  medium?: string,
};

export type Adapter<DataType> = {
  platform: Platform,
  fetchData(): DataType;
  fetchDashboard(data: DataType): DashboardAsset[];
};

export const HubbleAdapter: Adapter<string> = {
  platform: hubblePlatform,
  fetchData() {
    return 'ici';
  },
  fetchDashboard(data:string) {
    const a = {
      type: data,
    } as DashboardAsset;
    return [a];
  },
};
