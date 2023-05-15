import { TLotRMovie, TLotRQuote } from "./types"
import { ApiCall } from "./util/apiCall"
import { movieInstanceFromJson } from "./util/factory"

export class LotRMovie {
  title: string
  id: number

  private apiCall: ApiCall

  constructor(_id: number, _title: string, _apiCall: ApiCall) {
    this.id = _id
    this.title = _title
    this.apiCall = _apiCall
  }

  /**
   * return quotes from movie by movie id
   * @param id movie id
   */
  public async getMovieQuotesById(id: {id: string}): Promise<{ quotes: TLotRQuote[] }> {
    const data = await this.apiCall.post<{ quotes: TLotRQuote[] }>(
      `/movies/${id}/quotes`
    )

    return {
      quotes: 
    }
  }
}