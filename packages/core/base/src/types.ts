export type Network = {
  id: string,
  name: string,
  description: string,
  logoURI: string,
  discord?: string,
  twitter?: string,
  website?: string,
  medium?: string,
};

export type Platform = {
  id: string,
  name: string,
  description: string,
  logoURI: string,
  discord?: string,
  twitter?: string,
  website?: string,
  medium?: string,
};

export type DashboardAsset = {
  networkId: string,
  platformId: string,
  owner: string,
  type: string,
  name?: string,
  value: number,
  elements?: AssetElement[]
};

export type AssetElement = {
  type: string,
  value: number
};

export type AssetElementToken = AssetElement & {
  type: 'token'
  amount: number
  mint: string
};
