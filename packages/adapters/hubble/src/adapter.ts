import { Hubble } from '@hubbleprotocol/hubble-sdk';
import { Connection, PublicKey } from '@solana/web3.js';
import { AdapterName, AdapterId, BaseAdapter } from '@sonarwatch/dashboard-adapter-base';

export const HubbleAdapterId = 'hubble' as AdapterId;
export const HubbleAdapterName = 'Hubble Proctol' as AdapterName;

export class HubbleAdapter extends BaseAdapter {
  id = HubbleAdapterId;

  name = HubbleAdapterName;

  url = 'https://hubbleprotocol.io';

  // eslint-disable-next-line class-methods-use-this
  async fetch(connection: Connection, address: PublicKey): Promise<string> {
    const cluster = 'mainnet-beta';
    const hubble = new Hubble(cluster, connection);
    const stakedHbb = await hubble.getUserStakedHbb(address);
    return stakedHbb.toString();
  }
}
