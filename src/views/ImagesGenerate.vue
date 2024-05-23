<template>
  <div>
    <button @click="generateImage">Generate Image</button>
    {{ promptHero }}
    <textarea placeholder="Изображение героя" v-model="promptHero"></textarea>
    <div v-if="imageUrl">
      <img :src="imageUrl" alt="Generated Image" />
    </div>
  </div>
</template>

<script>
import { Text2ImageAPI } from '@/scripts/api'

export default {
  data() {
    return {
      imageUrl: null,
      api: new Text2ImageAPI(
        'https://api-key.fusionbrain.ai/',
        '2C2AFA7C587DA4B05B7E9367C9453199',
        '6F76A081CA2445941CF6414CA75DEDDB'
      ),
      promptHero: ''
    }
  },
  methods: {
    async generateImage() {
      try {
        if (!this.promptHero) {
          console.error('No prompt provided')
          return
        }
        console.log('modelId')
        const modelId = await this.api.getModel()
        console.log(modelId)
        const uuid = await this.api.generate(this.promptHero, modelId)
        console.log(uuid)
        const images = await this.api.checkGeneration(uuid)
        console.log(images)
        this.imageUrl = `data:image/png;base64,${images[0]}` // Предполагается, что первое изображение - это то, что нам нужно
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
