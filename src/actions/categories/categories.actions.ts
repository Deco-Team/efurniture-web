'use server'

import { callApi } from '@actions/actions'
import { ICategory } from '@global/interface'

const ROOT_ENDPOINT_CATEGORIES = '/categories/customer'

export const getCategories = async (page: number, limit: number, sort?: string) => {
  const endpoint = `${ROOT_ENDPOINT_CATEGORIES}?page=${page}&limit=${limit}${sort ? `&sort=${sort}` : ''}`
  try {
    const response = await callApi<{ docs: ICategory[] }>({ method: 'get', endpoint })

    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}
