import { axiosInstance } from './axiosInstance'

export const apiService = () => {
  const request = async <T,>(url: string, method: string, body: {} | undefined, options = {}): Promise<T> => {
    try {
      const response = await axiosInstance({
        url,
        method,
        data: body,
        headers: {
          'Content-Type': 'application/json'
        },
        ...options
      })

      return response.data as T
    } catch (err) {
      if (err instanceof Error) {
        throw err
      }
      throw new Error('An unknown error occurred')
    }
  }

  const getRequest = async <T,>(url: string, options = {}): Promise<T> => {
    return request(url, 'GET', undefined, options)
  }

  const postRequest = async <T,>(url: string, body = {}, options = {}): Promise<T> => {
    return request(url, 'POST', body, options)
  }

  const putRequest = async <T,>(url: string, body = {}, options = {}): Promise<T> => {
    return request(url, 'PUT', body, options)
  }

  const patchRequest = async <T,>(url: string, body = {}, options = {}): Promise<T> => {
    return request(url, 'PATCH', body, options)
  }

  const deleteRequest = async <T,>(url: string, body = {}, options = {}): Promise<T> => {
    return request(url, 'DELETE', body, options)
  }

  return { getRequest, postRequest, putRequest, patchRequest, deleteRequest }
}
