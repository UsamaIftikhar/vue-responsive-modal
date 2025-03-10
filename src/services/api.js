import axios from 'axios'

// Create axios instance with common config
const api = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.VUE_APP_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const customerService = {
  async getCustomers() {
    try {
      const response = await api.get('/mock_customers.json')
      return response.data.result
    } catch (error) {
      console.error('Error fetching customers:', error)
      throw error
    }
  }
} 