import { HubbleAdapter } from '..';

test('HubbleAdapter test', async () => {
  const hubbleAdapter = new HubbleAdapter();
  await hubbleAdapter.fetchData({
    rpcEndpoint: 'https://sonar.genesysgo.net/',
  });
  const user = 'tEsT1vjsJeKHw9GH5HpnQszn2LWmjR6q1AVCDCj51nd';
  await hubbleAdapter.fetchDashboard(user);
  expect(true).toBe(true);
});
