const ENDPOINT = import.meta.env.VITE_API_ENDPOINT

export default class JitchatAPIService {
  public static postRequestWithJson = async (
    route: string,
    params: object
  ): Promise<Response> => {
    const response = await fetch(`${ENDPOINT}/${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(params),
    })

    return response;
  }

  public static getRequestWithParams = async (
    route: string,
    params: URLSearchParams
  ): Promise<Response> => {
    const url = `${ENDPOINT}/${route}?${params.toString()}`
    
    const response = await fetch(url, { method: 'GET' })
  
    return response
  }
  }
