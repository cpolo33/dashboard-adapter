export type AdapterName = string & { __brand__: 'AdapterName' };
export type AdapterId = string & { __brand__: 'AdapterId' };

export abstract class BaseAdapter {
  abstract id: AdapterId;

  abstract name: AdapterName;

  abstract url: string;

  display(): void {
    // eslint-disable-next-line no-console
    console.log(this.name);
  }
}
