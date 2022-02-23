import { Connection, PublicKey } from '@solana/web3.js';

export type AdapterName = string & { __brand__: 'adapterName' };
export type AdapterId = string & { __brand__: 'adapterId' };

export abstract class BaseAdapter {
  abstract id: AdapterId;

  abstract name: AdapterName;

  abstract url: string;

  abstract fetch(connection: Connection, address : PublicKey) : Promise<any>;

  fetchMultiple(connection: Connection, addresses : [PublicKey]) : Promise<any>[] {
    return addresses.map((address) => this.fetch(connection, address));
  }
}
