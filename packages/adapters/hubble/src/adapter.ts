import { AdapterName, AdapterId } from "@sonarwatch/dashboard-adapter-base";

const HubbleAdapterId = 'hubble' as AdapterId
const HubbleAdapterName = 'Hubble Proctol' as AdapterName

export class HubbleAdapter extends BaseAdapter {
  id = HubbleAdapterId;
  name = HubbleAdapterName;
  url = 'https://clover.finance';
}
