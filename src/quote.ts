import { ApiCall } from "./util/apiCall"

export class LotRQuote {
  id: string
  quote: string

  private apiCall: ApiCall

  constructor(_id: string, _quote: string, _apiCall: ApiCall) {
    this.id = _id
    this.quote = _quote
    this.apiCall = _apiCall
  }

  // more methods to come!!!
}