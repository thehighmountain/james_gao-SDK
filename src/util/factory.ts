import { LotRMovie } from "../movie";
import { LotRQuote } from "../quote";
import { TLotRMovie, TLotRQuote } from "../types";
import { ApiCall } from "./apiCall";

export const movieInstanceFromJson = (movie: object, apiCall: ApiCall): LotRMovie & TLotRMovie => {
  const movieInstance: LotRMovie = new LotRMovie(movie['id'], movie['title'], apiCall)
  const lotrMovie = movieFromJson(movie)

  for (const property in lotrMovie) {
    if (Object.prototype.hasOwnProperty.call(lotrMovie, property)) {
      movieInstance[`${property}`] = lotrMovie[property]
    }
  }

  return movieInstance as LotRMovie & TLotRMovie
}

export const quoteInstanceFromJson = (quote: object, apiCall: ApiCall): LotRQuote & TLotRQuote => {
  const quoteInstance: LotRQuote = new LotRQuote(quote['id'], quote['quote'], apiCall)
  const lotrQuote = quoteFromJson(quote)

  for (const property in lotrQuote) {
    if (Object.prototype.hasOwnProperty.call(lotrQuote, property)) {
      quoteInstance[`${property}`] = lotrQuote[property]
    }
  }

  return quoteInstance as LotRQuote & TLotRQuote
}

const movieFromJson = (movie: object): TLotRMovie => {
  return {
    id: movie['id'],
    title: movie['title'],
    quotes: movie['quotes']
  }
}

const quoteFromJson = (quote: object): TLotRQuote => {
  return {
    id: quote['id'],
    quote: quote['title']
  }
}
