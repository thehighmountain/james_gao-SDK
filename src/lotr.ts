import { TLotRMovie, TLotRQuote } from "./types";
import { ApiCall } from "./util/apiCall";
import { movieInstanceFromJson, quoteInstanceFromJson } from "./util/factory";

export class LotR {
  apiCall: ApiCall

  constructor(apiKey?: string, logger?: (arg: string) => void) {
    this.apiCall = new ApiCall({ apiKey }, logger || ((arg: string) => arg))
  }

  /**
   * return all movies info
   */
  public async movies(): Promise<{ movies: TLotRMovie[] }> {
    const data = await this.apiCall.get<{ movies: object[] }>(
      `/movie`
    )
    // modifications needed as per response
    return {
      movies: data.movies.map(movie => movieInstanceFromJson(movie, this.apiCall))
    }
  }

  /**
   * return movie by id
   * @param id movie id
   */
  public async movieById(id: {id: string}): Promise<{ movie: TLotRMovie }> {
    const data = await this.apiCall.post<{ movie: object }>(
      `/movie/${id}`
    )
    // modifications needed as per response
    return {
      movie: movieInstanceFromJson(data.movie, this.apiCall)
    }
  }

  /**
   * return quote by id
   * @param id quote id
   */
  public async quoteById(id: {id: string}): Promise<{ quote: TLotRQuote }> {
    const data = await this.apiCall.post<{ quote: object }>(
      `/quote/${id}`
    )
    // modifications needed as per response
    return {
      quote: quoteInstanceFromJson(data.quote, this.apiCall)
    }
  }
}