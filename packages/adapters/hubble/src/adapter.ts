import { AdapterName, AdapterId, BaseAdapter } from '@sonarwatch/dashboard-adapter-base';

export const HubbleAdapterId = 'hubble' as AdapterId;
export const HubbleAdapterName = 'Hubble Proctol' as AdapterName;

export class HubbleAdapter extends BaseAdapter {
  id = HubbleAdapterId;

  name = HubbleAdapterName;

  url = 'https://hubbleprotocol.io/';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetch(connection, address): Promise<string> {
    return this.url;
  }
}
