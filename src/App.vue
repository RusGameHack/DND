<script setup>
import ImagesGenerate from './views/ImagesGenerate.vue'
import VanillaTilt from 'vanilla-tilt'

import D20Dice from './components/cubics/D20Dice.vue'
import { onMounted, ref } from 'vue'

const tiltBlock = ref(null)
onMounted(() => {
  VanillaTilt.init(tiltBlock.value, {
    max: 7,
    speed: 400,
    glare: true,
    'max-glare': 0.3,
    reverse: true
  })
})
const heroes = ref([
  {
    name: 'Лиран',
    img: new URL('./assets/personals/liran.png', import.meta.url).href,
    rage: 'Человек',
    professional: 'Темный маг (чернокнижник)',
    history: `Не помнит своих родителей, ширялся по улицам и попался колдуну, став жертвой его коварных планов. Его долго пытали, его тело истерзано в шрамах и порезах. Видны даже кости. Увидев в Лиране потенциал, маг стал обучать его. Лиран убил своего учителя, т.к. хотел стать личом, а Лиран хочет стать личом самолично.`,
    isActiveHistory: false,
    motivation: 'Cтать личом',
    strong: 0,
    dexterity: 1,
    intellect: 3,
    charisma: -3,
    health: 13,
    shield: 10,
    deadly: false
  },
  {
    name: 'Слюнтик',
    img: new URL('./assets/personals/sluntik.png', import.meta.url).href,
    rage: 'Человек',
    professional: 'Бард-ассасин',
    history: `В 5 лет отказалась мать и подобрали люди из гильдии воров. Стали обучать своему ремеслу. Мастерски владеет музыкальными инструментами благодаря чему зарабатывал получением информации на балах.`,
    isActiveHistory: false,
    motivation: 'Хочет найти мать...',
    strong: 0,
    dexterity: 1,
    intellect: 3,
    charisma: -3,
    health: 16,
    shield: 14,
    deadly: false
  },
  {
    name: 'Арстон',
    img: new URL('./assets/personals/AstorionNormal.png', import.meta.url).href,
    rage: 'Гном',
    professional: 'Большие ладони',
    history: `Лысый гном - горе в семье. В детстве, если у гнома нет бороды - он изгой. В Арстона кидали камни, дети с ним не играли. Арстон хочет уйти из деревни и доказать, что все в нем ошибались. У Арстона очень огромные ладони. У него нет бороды и каких-либо других волос.`,
    isActiveHistory: false,
    motivation: 'Доказать свою значимость',
    strong: 3,
    dexterity: 1,
    intellect: 0,
    charisma: -2,
    health: 20,
    shield: 12,
    deadly: false
  }
])

const selectedHeroIndex = ref(-1)

function selectHero(index) {
  if (selectedHeroIndex.value === index) {
    selectedHeroIndex.value = -1
  } else {
    selectedHeroIndex.value = index
  }
}

function handleAttack(attackRoll) {
  if (selectedHeroIndex.value !== -1) {
    const hero = heroes.value[selectedHeroIndex.value]
    if (attackRoll > hero.shield) {
      // Урон проходит
      return true
    } else {
      // Урон не проходит
      return false
    }
  }
  return null
}

function applyDamage(damage) {
  if (selectedHeroIndex.value !== -1) {
    const hero = heroes.value[selectedHeroIndex.value]
    hero.health -= damage
    if (hero.health <= 0) {
      hero.health = 0
      hero.deadly = true
    }
  }
}
</script>

<template>
  <div>
    <div class="cards">
      <div
        class="card"
        ref="tiltBlock"
        v-for="(hero, index) in heroes"
        :key="index"
        :style="`z-index:${1000 - index}`"
        @click="selectHero(index)"
        :class="{ selected: selectedHeroIndex === index }"
      >
        <div class="card-top">
          <img :src="hero.img" alt="" />
          <div class="health">
            <img src="./assets/icons/heart.png" alt="" />
            <div class="point-text">{{ hero.health }}</div>
          </div>
          <div class="shield">
            <img src="./assets/icons/shield.png" alt="" />
            <div class="point-text">{{ hero.shield }}</div>
          </div>
        </div>
        <div class="card-content">
          <div class="card-title">{{ hero.name }}</div>
          <div class="card-rage">{{ hero.rage }}</div>
          <div class="card-professional">{{ hero.professional }}</div>
          <button class="history-btn" @click.stop="hero.isActiveHistory = !hero.isActiveHistory">
            <img class="history-img" src="./assets/icons/svitok.png" alt="" />
          </button>
          <div class="card-history-block" :class="{ active: hero.isActiveHistory }" @click.stop>
            <div class="card-history">{{ hero.history }}</div>
          </div>
          <table class="special">
            <thead>
              <tr>
                <td>Сила</td>
                <td>Лов</td>
                <td>Инт</td>
                <td>Хар</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ hero.strong }}</td>
                <td>{{ hero.dexterity }}</td>
                <td>{{ hero.intellect }}</td>
                <td>{{ hero.charisma }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <D20Dice @attack="handleAttack" @damage="applyDamage" :selectedHeroIndex="selectedHeroIndex" />
  </div>
</template>

<style>
.selected {
  border: 2px solid red;
}
* {
  font-family: 'Roboto';
}
.special {
  margin-top: 10px;
  width: 100%;
}
.cards {
  display: flex;
  gap: 60px;
  position: fixed;
  bottom: -340px;
  z-index: 10;
  width: 100%;
  transition: 0.3s all;
}
.cards:hover {
  bottom: 15px;
}
.card {
  position: relative;
  width: 250px;
  border-radius: 15px;
  -webkit-box-shadow: 4px 4px 24px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 24px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 24px 0px rgba(34, 60, 80, 0.2);
}
.card-top {
  display: flex;
  position: relative;
  z-index: 2;
}
.card-top img {
  width: 100%;
  height: 330px;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
}
.health {
  position: absolute;
  right: 5px;
  top: 10px;
}
.health img {
  width: 50px;
  height: 46px;
}
.shield {
  position: absolute;
  right: 5px;
  top: 65px;
}
.shield img {
  width: 50px;
  height: 50px;
}
.point-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -65%);
  font-weight: 700;
  color: white;
  text-shadow:
    0px 0 6px #000,
    0 0px 6px #000,
    0px 0 6px #000,
    0 0px 6px #000;
}
.card-content {
  padding: 15px;
}
.card-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
}
.card-rage,
.card-professional {
  font-size: 16px;
  margin-bottom: 3px;
}
.card-history-block {
  position: absolute;
  top: 50px;
  right: 0;
  background: ghostwhite;
  transform: translateX(0);
  transition: 0.3s all;
  border-radius: 0 5px 5px 0;
  border: 1px solid black;
  padding: 5px 10px;
  z-index: 1;
}
.card-history-block.active {
  transform: translateX(100%);
}
.history-btn {
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(100%);
  padding: 0;
  background: unset;
  border: unset;
  cursor: pointer;
  color: blue;
}
.history-btn img {
  width: 50px;
}
</style>

<!-- prompt:
3 человека в ритуальных одеяниях держат ножи. Фэнтези. 2Д. Лица не видно. Глаза горят желтым цветом.
-->
