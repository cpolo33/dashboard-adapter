import { HubbleAdapter } from '..';

test('HubbleAdapter test', async () => {
  const hubbleAdapter = new HubbleAdapter();
  await hubbleAdapter.fetchData({
    rpcEndpoint: 'https://sonar.genesysgo.net/',
  });
  const user = 'tEsT1vjsJeKHw9GH5HpnQszn2LWmjR6q1AVCDCj51nd';
  const user2 = 'Empty111111111111111111111111111111111111111';
  await hubbleAdapter.fetchDashboard(user);
  await hubbleAdapter.fetchDashboard(user2);
  expect(true).toBe(true);
});
