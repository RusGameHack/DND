<template>
  <div>
    <div class="cubic-block">
      <div v-for="(cubic, index) in cubics" :key="index">
        <input
          type="number"
          :name="`D${cubic.type}`"
          :value="cubic.count"
          @input="updateCount(index, $event.target.value)"
          :max="cubic.max"
          min="0"
        />
        <div>Кубик Д{{ cubic.type }}</div>
        {{ cubic.count }}
      </div>
    </div>
    <button @click="rollDice">Бросок</button>
    <div v-for="(cubic, index) in cubics" :key="`result-${index}`" class="cubics">
      <div v-for="n in cubic.count" :key="`cubic-${index}-${n}`" :class="`cubic d-${cubic.type}`">
        <div class="cubic-text">{{ currentResults[index][n - 1] }}</div>
      </div>
    </div>
    <div v-if="totalSum">
      <p>Сумма кубиков (без D-20): {{ totalSum }}</p>
    </div>
    <!-- <div>
      <button @click="selectGreaterValue">Выбрать большее значение</button>
      <button @click="selectSmallerValue">Выбрать меньшее значение</button>
    </div> -->
    <button v-if="selectedHeroIndex != -1" @click="performAttack">Атака</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  onAttack: Function,
  onDamage: Function,
  selectedHeroIndex: Number
})

const cubics = ref([
  { type: 20, max: 2, count: 0 },
  { type: 12, max: 3, count: 0 },
  { type: 8, max: 4, count: 0 },
  { type: 6, max: 5, count: 0 },
  { type: 3, max: 8, count: 0 }
])

const results = ref(Array.from({ length: cubics.value.length }, () => []))
const currentResults = ref(Array.from({ length: cubics.value.length }, () => []))
const d20Result = ref({ greater: 0, smaller: 0 })

function updateCount(index, value) {
  const intValue = parseInt(value)
  if (intValue >= 0 && intValue <= cubics.value[index].max) {
    cubics.value[index].count = intValue
  }
}

function rollDice() {
  cubics.value.forEach((cubic, cubicIndex) => {
    results.value[cubicIndex] = Array.from(
      { length: cubic.count },
      () => Math.floor(Math.random() * cubic.type) + 1
    )
    currentResults.value[cubicIndex] = Array.from({ length: cubic.count }, () => 0)

    results.value[cubicIndex].forEach((_, resultIndex) => {
      let intervalId = setInterval(() => {
        currentResults.value[cubicIndex][resultIndex] = Math.floor(Math.random() * cubic.type) + 1
      }, 100)

      const timeoutDuration = Math.floor(Math.random() * 3000) + 1000
      setTimeout(() => {
        clearInterval(intervalId)
        currentResults.value[cubicIndex][resultIndex] = results.value[cubicIndex][resultIndex]
      }, timeoutDuration)
    })

    if (cubic.type === 20) {
      const rolls = results.value[cubicIndex]
      d20Result.value.greater = Math.max(...rolls)
      d20Result.value.smaller = Math.min(...rolls)
    }
  })

  console.log('Dice rolls:', results.value)
}

function selectGreaterValue() {
  alert(`Большее значение для D-20: ${d20Result.value.greater}`)
}

function selectSmallerValue() {
  alert(`Меньшее значение для D-20: ${d20Result.value.smaller}`)
}

function performAttack() {
  const attackRoll = d20Result.value.greater
  const attackSuccess = props.onAttack(attackRoll)
  if (attackSuccess) {
    const damage = totalSum.value
    props.onDamage(damage)
  } else {
    alert('Атака не удалась!')
  }
}

const totalSum = computed(() => {
  return cubics.value.reduce((sum, cubic, index) => {
    if (cubic.type !== 20) {
      return sum + currentResults.value[index].reduce((subSum, value) => subSum + value, 0)
    }
    return sum
  }, 0)
})
</script>

<style scoped>
.cubic {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  border-radius: 10px;
  border: 1px solid black;
  font-size: 42px;
  position: relative;
}
.cubic-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
.cubic-block {
  display: flex;
  gap: 15px;
}
.cubics {
  display: flex;
  gap: 15px;
  margin-top: 15px;
}
.d-20,
.d-20:before {
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}
.d-20:before,
.d-12:before,
.d-8:before,
.d-6:before,
.d-3:before {
  content: '';
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  background: #f5efdc;
  display: block;
  position: absolute;
  top: 1px;
  left: 1px;
  z-index: 1;
}
.d-3,
.d-3::before {
  clip-path: polygon(41.85% 0%, 57.34% 0%, 100% 75.89%, 82% 100%, 18% 100%, 0% 76.1%);
}
.d-12,
.d-12:before {
  clip-path: polygon(
    55.88% 0%,
    86.98% 18.23%,
    100% 41.72%,
    94.46% 74.26%,
    74.86% 92.56%,
    44.89% 99.72%,
    14.01% 82.6%,
    0.14% 53.27%,
    5.67% 24.34%,
    27.45% 7.11%
  );
}
</style>
