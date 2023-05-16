import { test_movies } from "./mockData"
import { movieInstanceFromJson } from '../util/factory'
import { ApiCall } from "../util/apiCall"
import { LotRMovie } from "../movie"

test('should return movie object', () => { 
  const movies = test_movies
  const apiCall = new ApiCall({ apiKey: "123456789" })
  const result = movies.map((movie) => movieInstanceFromJson(movie, apiCall))

  expect(result.length).toBe(3)
  expect(result).toEqual(expect.any(Array))
  expect(result[0]).toBeInstanceOf(LotRMovie)
  expect(result[0]).toHaveProperty('id')
  expect(result[0]).toHaveProperty('title')
  expect(result[0]).toHaveProperty('quotes')
 })