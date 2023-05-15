import { TLotRQuote } from "./types"
import { ApiCall } from "./util/apiCall"
import { quoteInstanceFromJson } from "./util/factory"

export class LotRMovie {
  id: string
  title: string

  private apiCall: ApiCall

  constructor(_id: string, _title: string, _apiCall: ApiCall) {
    this.id = _id
    this.title = _title
    this.apiCall = _apiCall
  }

  /**
   * return quotes from movie by movie id
   * @param id movie id
   */
  public async getQuotes(id: {id: string}): Promise<{ quotes: TLotRQuote[] }> {
    const data = await this.apiCall.post<{ quotes: object[] }>(
      `/movie/${id}/quote`
    )
    
    // modifications needed as per response
    return {
      quotes: data.quotes.map(quote => quoteInstanceFromJson(quote, this.apiCall))
    }
  }
}