/* eslint-disable import/prefer-default-export */
export enum Network {
  Solana = 'solana',
  Ethereum = 'ethereum',
}

export type UnderlyingToken = Token & {
  reserveAmount: number,
  reserveValue: number,
};

export type Token = {
  address: String,
  type: String,
  platform: String,
  symbol: String,
  price: Number,
  supply: Number,
  supplyValue: Number,
  decimals: Number,
  tokens?: UnderlyingToken[]
};
