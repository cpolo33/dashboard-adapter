import { Connection, PublicKey } from '@solana/web3.js';
import { Network } from './types';

export type DashboardAsset = {
  network: Network,
  platform: string,
  owner: string,
  type: string,
  name: string,
  value: number,
  elements?: AssetElement[]
};

export type AssetElement = {
  type: string,
  value: number
};

export abstract class BaseAdapter {
  abstract readonly id: string;

  abstract readonly name: string;

  abstract readonly url: string;

  protected connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  abstract fetch(connection: Connection, address : PublicKey) : Promise<DashboardAsset[]>;

  fetchMultiple(connection: Connection, addresses : [PublicKey]) : Promise<DashboardAsset[]>[] {
    return addresses.map((address) => this.fetch(connection, address));
  }
}
