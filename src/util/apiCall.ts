import 'isomorphic-unfetch'
import queryString from 'query-string'

export interface IApiCallConfig {
  apiKey?: string
}

export class ApiCall {
  /**
   * Base URL for API
   */
  private apiBaseUrl = 'https://example.com/lotr/api/v1'

  /**
   * APi Key from LotR developer portal
   */
  apiKey: string

  /**
   * Logger for debugging
   */
  private logger: (arg: string) => void

  constructor(config: IApiCallConfig, logger?: (arg: string) => void) {
    this.apiKey = config.apiKey || ''
    this.logger = logger || ((arg: string) => arg)
  }

  private async _fetch(apiPath: string, opts: RequestInit = {}) {
    const apiBase = this.apiBaseUrl
    const finalUrl = apiBase + apiPath

    return fetch(finalUrl, opts).then(async (res) => {
      return this._handleApiResponse(res)
    })
  }

  private async _handleApiResponse(response: Response) {
    if (response.ok) {
      return response
    }

    let result
    let errorMessage

    try {
      result = await response.text()
      result = JSON.parse(result)
    } catch (err) {
      // to make result to be undefined - update if required
    }

    this.logger(`Got error ${response.status}: ${JSON.stringify(result)}`)

    switch (response.status) {
      case 400:
        errorMessage = result && result.errors ? result.errors.join(', ') : `Invalid request: ${JSON.stringify(result)}`
        break;
        
      case 401:
      case 403:
        errorMessage = `Unauthorized. ${JSON.stringify(result)}'`;
        break;

      case 404:
        errorMessage = `Not found. '${JSON.stringify(result)}'`;
        break;

      case 500:
        errorMessage = `Internal server error.'${JSON.stringify(result)}'`;
        break;

      case 503:
        errorMessage = `Service unavailable. '${JSON.stringify(result)}'`;
        break;

      default:
        errorMessage = `Message: ${JSON.stringify(result)}`;
        break;
    }

    throw new Error(`API Error ${response.status}: ${errorMessage}`)
  }

  /**
   * Get Json Data from API
   * @param apiPath Endpoint for API
   * @param query Data to send, will be qs.stringified
   */
  public async get<T>(apiPath: string, query: object = {}): Promise<T> {
    let url = `${apiPath}`
    if (Object.keys(query).length > 0) {
      const qs = queryString.stringify(query)
      url = `${apiPath}?${qs}`
    }

    const response = await this._fetch(url)
    return response.json()
  }

  /**
   * POST JSON data to API
   * @param apiPath Endpoint for API
   * @param query Data for url query, will be qs.stringified
   * @param body Data to send, will be JSON.stringified
   * @param opts RequestInit opts, similar to fetch API
   */
  public async post<T>(apiPath: string, query: object = {}, body?: object, opts: RequestInit = {}): Promise<T> {
    let url = apiPath
    if (Object.keys(query).length > 0) {
      const qs = queryString.stringify(query);
      url = `${apiPath}?${qs}`;
    }

    const response = await this._fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // whatever header setting you need to set
      body: body ? JSON.stringify(body) : undefined,
      ...opts
    })

    return response.json()
  }
}
