import { HubbleAdapter } from '..';

test('HubbleAdapter test', async () => {
  const fetchData = async () => {
    const rpcEndpoint = 'https://sonar.genesysgo.net/';
    const hubbleAdapter = new HubbleAdapter(rpcEndpoint);
    await hubbleAdapter.fetchData();
    const user = 'tEsT1vjsJeKHw9GH5HpnQszn2LWmjR6q1AVCDCj51nd';
    await hubbleAdapter.fetchDashboard(user);
    return true;
  };
  await expect(fetchData()).resolves.toBe(true);
});
