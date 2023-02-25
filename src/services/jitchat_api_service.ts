
const ENDPOINT = import.meta.env.API_ENDPOINT

export default class JitchatService {
  public static postRequestWithJson = async (
    route: string,
    params: object
  ): Promise<Response> => {
    const response = await fetch(`${ENDPOINT}${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    return response
  }

  public static getRequestWithParams = async (
    route: string,
    params: URLSearchParams
  ): Promise<Response> => {
    const response = await fetch(`${ENDPOINT}${route}`, {
      method: 'GET',
      body: params,
    })

    return response
  }
}
