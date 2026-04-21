<script setup>
const cards = [
  {
    name: "Мои заказы",
    img: "/safe.png",
  },
  {
    name: "Мои заказы",
    img: "/safe.png",
  },
  {
    name: "Мои заказы",
    img: "/safe.png",
  },
  {
    name: "Мои заказы",
    img: "/safe.png",
  },
  {
    name: "Мои заказы",
    img: "/safe.png",
  },
  {
    name: "Мои заказы",
    img: "/safe.png",
  },
];
</script>

<template>
  <div class="container">
    <img src="/bg.png" alt="" />

    <div class="cards">
      <div v-for="item in cards" class="card">
        <div class="card__name">{{ item.name }}</div>
        <div class="card__img">
          <img :src="item.img" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  width: 95%;
  margin: 0 auto;
}
.cards {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 150px;
  gap: 10px;
}
</style>
