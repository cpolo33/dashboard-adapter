/* eslint-disable max-classes-per-file */
import { Hubble } from '@hubbleprotocol/hubble-sdk';
import { Connection } from '@solana/web3.js';
import {
  DashboardAsset, AssetElementToken, Platform, Adatper,
} from '@sonarwatch/dashboard-adapter-base';
import axios from 'axios';

export const HubblePlatform:Platform = {
  id: 'hubble',
  name: 'Hubble Protocol',
  description: 'Mint USDH stablecoin at 0% interest against multiple types of collateral',
  logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HBB111SCo9jkCejsZfz8Ec8nH7T6THF8KEKSnvwT6XK6/logo.svg',
  discord: 'https://discord.gg/d44A8WvK',
  twitter: 'https://twitter.com/hubbleprotocol',
  website: 'https://hubbleprotocol.io/',
};

export class HubbleAdapter extends Adatper {
  platform:Platform = HubblePlatform;

  rpcEndpoint:string;

  connection:Connection;

  hubble:Hubble;

  prices: Map<string, number> = new Map();

  constructor(rpcEndpoint:string) {
    super();
    this.rpcEndpoint = rpcEndpoint;
    this.connection = new Connection(this.rpcEndpoint);
    this.hubble = new Hubble('mainnet-beta', this.connection);
  }

  async fetchData() {
    this.connection = new Connection(this.rpcEndpoint);
    this.hubble = new Hubble('mainnet-beta', this.connection);
    const prices = new Map();
    const pricesRes = await axios.get('/simple/price', {
      baseURL: 'https://api.coingecko.com/api/v3',
      timeout: 1000,
      params: {
        ids: 'hubble,usdh',
        vs_currencies: 'usd',
      },
    });
    for (const key in pricesRes.data) {
      if (Object.prototype.hasOwnProperty.call(pricesRes.data, key)) {
        const element = pricesRes.data[key];
        prices.set(key, element.usd);
      }
    }

    this.prices = prices;
  }

  async fetchDashboard(address: string) {
    const res = await Promise.all(
      [
        this.fetchStakedHbb(address),
        this.fetchStability(address),
      ],
    );
    const assets:DashboardAsset[] = [];
    const stakedHbbAsset = res[0];
    const stabilityAsset = res[1];

    if (stakedHbbAsset) assets.push(stakedHbbAsset);
    if (stabilityAsset) assets.push(stabilityAsset);

    return assets;
  }

  async fetchStakedHbb(address: string): Promise<DashboardAsset | null> {
    const hbbPrice = this.prices.get('hubble') || NaN;

    const stakedHbbAmount = await this.hubble.getUserStakedHbb(address);
    if (!stakedHbbAmount || stakedHbbAmount.isZero()) return null;
    const stakedHbbValue = stakedHbbAmount.times(hbbPrice).toNumber();
    const stakedHbbAsset:DashboardAsset = {
      owner: address,
      networkId: 'solana',
      platformId: this.platform.id,
      type: 'type',
      value: stakedHbbValue,
      elements: [
        {
          type: 'token',
          value: stakedHbbValue,
          amount: stakedHbbAmount.toNumber(),
          mint: 'HBB111SCo9jkCejsZfz8Ec8nH7T6THF8KEKSnvwT6XK6',
        } as AssetElementToken,
      ],
    };
    return stakedHbbAsset;
  }

  async fetchStability(address: string): Promise<DashboardAsset | null> {
    const usdhPrice = this.prices.get('usdh') || NaN;

    const usdhAmount = await this.hubble.getUserUsdhInStabilityPool(address);
    if (!usdhAmount || usdhAmount.isZero()) return null;
    const usdhValue = usdhAmount.times(usdhPrice).toNumber();
    const stabilityAsset:DashboardAsset = {
      owner: address,
      networkId: 'solana',
      platformId: this.platform.id,
      type: 'type',
      value: usdhValue,
      elements: [
        {
          type: 'token',
          value: usdhValue,
          amount: usdhAmount.toNumber(),
          mint: 'USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX',
        } as AssetElementToken,
      ],
    };
    return stabilityAsset;
  }
}
