import { ApiCall } from "./util/apiCall";

export class LotR {
  apiCall: ApiCall

  constructor(apiKey?: string, logger?: (arg: string) => void) {
    this.apiCall = new ApiCall({ apiKey }, logger || ((arg: string) => arg))
  }
}