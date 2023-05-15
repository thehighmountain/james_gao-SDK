import { LotRMovie } from "../movie";
import { TLotRMovie } from "../types";
import { ApiCall } from "./apiCall";

export const movieInstanceFromJson = (movie: object, apiCall: ApiCall): LotRMovie & TLotRMovie => {
  const movieInstance: LotRMovie = new LotRMovie(movie['id'], movie['title'], apiCall)
  const lotrMovie = movieFromJson(movie)

  Object.entries(lotrMovie).forEach(([key, value]) => {
    movieInstance[`${key}`] = value
  })

  return movieInstance as LotRMovie & TLotRMovie
}

const movieFromJson = (movie: object): TLotRMovie => {
  return {
    id: movie['id'],
    title: movie['title'],
    quotes: movie['quotes']
  }
}
