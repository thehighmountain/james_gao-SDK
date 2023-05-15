import { TLotRMovie, TLotRQuote } from "./types"
import { ApiCall } from "./util/apiCall"

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
   * return all movies info
   */
  public async getAllMovies(): Promise<{ movies: TLotRMovie[] }> {
    const data = await this.apiCall.get<{ movies: object[] }>(
      `/movies`
    )
    // modifications needed as per response
    return {
      movies: data.movies
    }
  }

  /**
   * return movie by id
   * @param id movie id
   */
  public async getMovieById(id: {id: string}): Promise<{ movie: TLotRMovie }> {
    const data = await this.apiCall.post<{ movie: TLotRMovie }>(
      `/movies/${id}`
    )
    // modifications needed as per response
    return {
      movie: data.movie
    }
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