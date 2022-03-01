import { HubbleAdapter } from '..';

test('HubbleAdapter test', async () => {
  const hubbleAdapter = new HubbleAdapter();
  await hubbleAdapter.fetchData({
    rpcEndpoint: 'https://sonar.genesysgo.net/',
  });
  const user = 'tEsT1vjsJeKHw9GH5HpnQszn2LWmjR6q1AVCDCj51nd';
  const assets = await hubbleAdapter.fetchDashboard(user);
  console.log('~ assets', assets);
  // const user2 = 'Empty111111111111111111111111111111111111111';
  // await hubbleAdapter.fetchDashboard(user2);
  expect(true).toBe(true);
});
