import { Connection, PublicKey } from '@solana/web3.js';
import { HubbleAdapter } from '..';

test('HubbleAdapter test', async () => {
  const connection = new Connection('https://sonar.genesysgo.net/');
  const testUser = new PublicKey('tEsT1vjsJeKHw9GH5HpnQszn2LWmjR6q1AVCDCj51nd');
  const hubbleAdapter = new HubbleAdapter();
  const res = await hubbleAdapter.fetch(connection, testUser);
  console.log('~ res', res);

  expect(true).toBe(true);
});
