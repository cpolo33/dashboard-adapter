/* eslint-disable max-classes-per-file */
import { Hubble } from '@hubbleprotocol/hubble-sdk';
import { Connection } from '@solana/web3.js';
import { DashboardAsset, Network } from '@sonarwatch/dashboard-adapter-base';
import axios from 'axios';

export const HubbleAdapterId = 'hubble';
export const HubbleAdapterName = 'Hubble Proctol';

export const HubblePlatform:Platform = {
  id: 'hubble',
  name: 'Hubble Protocol',
  description: 'Mint USDH stablecoin at 0% interest against multiple types of collateral',
  logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HBB111SCo9jkCejsZfz8Ec8nH7T6THF8KEKSnvwT6XK6/logo.svg',
  discord: 'https://discord.gg/d44A8WvK',
  twitter: 'https://twitter.com/hubbleprotocol',
  website: 'https://hubbleprotocol.io/',
};

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
  fetchData(): Promise<DataType>;
  fetchDashboard(data: DataType, address: String): Promise<DashboardAsset[]>;
};

export abstract class AdatperClass<AdapterData, AdapterConfig> {
  abstract readonly platform: Platform;

  abstract data: AdapterData;

  abstract fetchData(config: AdapterConfig): void;
  abstract fetchDashboard(address: string) : Promise<DashboardAsset[]>;
}

type HubbleData = {
  prices: Map<string, number>
  connection?: Connection,
  hubble?: Hubble
};

type HubbleConfig = {
  rpcEndpoint: string
};

export class HubbleAdapter extends AdatperClass<HubbleData, HubbleConfig> {
  data:HubbleData = {
    prices: new Map(),
    connection: undefined,
    hubble: undefined,
  };

  platform:Platform = HubblePlatform;

  async fetchData(config: HubbleConfig) {
    const connection = new Connection(config.rpcEndpoint);
    const hubble = new Hubble('mainnet-beta', connection);
    const prices = new Map();
    const pricesRes = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=hubble,usdh&vs_currencies=usd');
    for (const key in pricesRes.data) {
      if (Object.prototype.hasOwnProperty.call(pricesRes.data, key)) {
        const element = pricesRes.data[key];
        prices.set(key, element.usd);
      }
    }

    const data: HubbleData = {
      prices,
      connection,
      hubble,
    };
    this.data = data;
  }

  async fetchDashboard(address: string) {
    const assets:DashboardAsset[] = [];
    if (!this.data.hubble) return assets;

    const stakedHbb = await this.data.hubble.getUserStakedHbb(address);
    const loans = await this.data.hubble.getUserLoans(address);
    const usdh = await this.data.hubble.getUserUsdhInStabilityPool(address);
    console.log('~ stakedHbb', stakedHbb);
    console.log('~ loans', loans);
    console.log('~ usdh', usdh);

    if (stakedHbb) {
      const stakedHbbAsset: DashboardAsset = {
        owner: address,
        network: Network.solana,
        platform: 'hubble',
        type: 'type',
        name: 'name',
        value: 1,
      };
      assets.push(stakedHbbAsset);
    }
    return assets;
  }
}
