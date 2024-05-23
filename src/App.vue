<script setup>
import ImagesGenerate from './views/ImagesGenerate.vue'
const heroes = [
  {
    name: 'Лиран',
    img: new URL('./assets/personals/liran.png', import.meta.url).href,
    rage: 'Человек',
    professional: 'Темный маг (чернокнижник)',
    history: `
        Не помнит своих родителей, ширялся по улицам и попался колдуну, став жертвой его коварных планов. 
        Его долго пытали, его тело истерзано в шрамах и порезах. Видны даже кости.
        Увидев в Лиране потенциал, маг стал обучать его. 
        Лиран убил своего учителя, т.к. хотел стать личом, а Лиран хочет стать личом самолично.
      `,
    motivation: 'Cтать личом',
    strong: 0,
    dexterity: 1,
    intellect: 3,
    charisma: -3,
    health: 20,
    shield: 10,
    deadly: false
  },
  {
    name: 'Слюнтик',
    img: new URL('./assets/personals/sluntik.png', import.meta.url).href,
    rage: 'Человек',
    professional: 'Бард-ассасин',
    history: `
      В 5 лет отказалась мать и подобрали люди из гильдии воров. 
      Стали обучать своему ремеслу. 
      Мастерски владеет музыкальными инструментами 
      благодаря чему зарабатывал получением информации на балах. 
      `,
    motivation: 'Хочет найти мать...',
    strong: 0,
    dexterity: 1,
    intellect: 3,
    charisma: -3,
    health: 20,
    shield: 10,
    deadly: false
  },
  {
    name: 'Арстон',
    img: new URL('./assets/personals/AstorionNormal.png', import.meta.url).href,
    rage: 'Гном',
    professional: 'Большие ладони',
    history: `
        Лысый гном - горе в семье. 
        В детстве, если у гнома нет бороды - он изгой. 
        В Арстона кидали камни, дети с ним не играли. 
        Арстон хочет уйти из деревни и доказать, что все в нем ошибались.  
        У Арстона очень огромные ладони. У него нет бороды и каких-либо других волос.
      `,
    motivation: 'Доказать свою значимость',
    strong: 3,
    dexterity: 1,
    intellect: 0,
    charisma: -2,
    health: 20,
    shield: 10,
    deadly: false
  }
]
</script>
<template>
  <div>
    <div class="cards">
      <div class="card" v-for="(hero, index) in heroes" :key="index">
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
          <div class="card-history">
            {{ hero.history }}
          </div>
        </div>
      </div>
    </div>
    <ImagesGenerate></ImagesGenerate>
  </div>
</template>

<style>
* {
  font-family: 'Roboto';
}
.cards {
  display: flex;
  gap: 2vw;
}
.card {
  width: 20vw;
  overflow: hidden;
  border-radius: 15px;
  -webkit-box-shadow: 4px 4px 24px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 24px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 24px 0px rgba(34, 60, 80, 0.2);
}
.card-top {
  display: flex;
  position: relative;
}
.card-top img {
  width: 100%;
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
.card-history {
  margin-top: 5px;
}
</style>
