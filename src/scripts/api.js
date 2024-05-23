import axios from 'axios'

export class Text2ImageAPI {
  constructor(url, apiKey, secretKey) {
    this.URL = url
    this.AUTH_HEADERS = {
      'X-Key': `Key ${apiKey}`,
      'X-Secret': `Secret ${secretKey}`
    }
  }

  async getModel() {
    const response = await axios.get(this.URL + 'key/api/v1/models', { headers: this.AUTH_HEADERS })
    return response.data[0].id
  }

  async generate(prompt, model, images = 1, width = 680, height = 1025) {
    const params = {
      type: 'GENERATE',
      numImages: images,
      width: width,
      height: height,
      generateParams: {
        query: prompt
      }
    }

    // Создаем новый экземпляр FormData
    const formData = new FormData()
    // Добавляем params как файл
    const blob = new Blob([JSON.stringify(params)], { type: 'application/json' })
    formData.append('params', blob, 'params.json')
    // Добавляем model_id как JSON
    formData.append('model_id', JSON.stringify(model))

    const response = await axios.post(this.URL + 'key/api/v1/text2image/run', formData, {
      headers: {
        ...this.AUTH_HEADERS,
        'Content-Type': 'multipart/form-data' // Устанавливаем заголовок Content-Type для multipart/form-data
      }
    })
    return response.data.uuid
  }

  async checkGeneration(requestId, attempts = 10, delay = 10) {
    while (attempts > 0) {
      try {
        const response = await axios.get(this.URL + 'key/api/v1/text2image/status/' + requestId, {
          headers: this.AUTH_HEADERS
        })
        if (response.data.status === 'DONE') {
          return response.data.images
        }
      } catch (error) {
        console.error(error)
      }

      attempts -= 1
      await new Promise((resolve) => setTimeout(resolve, delay * 1000))
    }
  }
}
