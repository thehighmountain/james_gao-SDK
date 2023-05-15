import { TLotRMovie } from "./types";
import { ApiCall } from "./util/apiCall";
import { movieInstanceFromJson } from "./util/factory";

export class LotR {
  apiCall: ApiCall

  constructor(apiKey?: string, logger?: (arg: string) => void) {
    this.apiCall = new ApiCall({ apiKey }, logger || ((arg: string) => arg))
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
      movies: data.movies.map(movie => movieInstanceFromJson(movie, this.apiCall))
    }
  }

  /**
   * return movie by id
   * @param id movie id
   */
  public async getMovieById(id: {id: string}): Promise<{ movie: TLotRMovie }> {
    const data = await this.apiCall.post<{ movie: object }>(
      `/movies/${id}`
    )
    // modifications needed as per response
    return {
      movie: movieInstanceFromJson(data.movie, this.apiCall)
    }
  }

}