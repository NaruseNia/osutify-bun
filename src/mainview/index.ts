import { Electroview } from 'electrobun/view';
import { WebviewRPCType } from '../shared/types';

const rpc = Electroview.defineRPC<WebviewRPCType>({
  handlers: {},
});

export const electroview = new Electroview({ rpc });
