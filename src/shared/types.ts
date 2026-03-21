import { RPCSchema } from "electrobun"

export type WebviewRPCType = {
  bun: RPCSchema<{
    requests: {
      getAllBeatmaps: {
        params: {},
        response: {
          beatmaps: string
        }
      }
    }
  }>;
  webview: RPCSchema<{
  }>;
}
