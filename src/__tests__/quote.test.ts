import { LotRQuote } from "../quote"
import { ApiCall } from "../util/apiCall"
import { quoteInstanceFromJson } from "../util/factory"
import { test_quotes } from "./mockData"

test('should return quote object list', () => { 
  const quotes = test_quotes
  const apiCall = new ApiCall({ apiKey: "123456789" })
  const result = quotes.map((quote) => quoteInstanceFromJson(quote, apiCall))

  expect(result.length).toBe(9)
  expect(result).toEqual(expect.any(Array))
  expect(result[0]).toBeInstanceOf(LotRQuote)
  expect(result[0]).toHaveProperty('id')
  expect(result[0]).toHaveProperty('quote')
 })