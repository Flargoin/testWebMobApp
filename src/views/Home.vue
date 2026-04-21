<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const onSwiper = (swiper) => {
  console.log(swiper);
};

const onSlideChange = () => {
  console.log("slide change");
};
</script>

<template>
  <div class="container">
    <img src="/bg.png" alt="" />

    <swiper
      class="cards"
      :slides-per-view="2.2"
      :space-between="10"
      :slides-offset-before="15"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide class="card">
        <div class="card__name">До скидки в 2% осталось</div>
        <div class="card__value">24 354 м²</div></swiper-slide
      >
      <swiper-slide class="card">
        <div class="card__name">До скидки в 2% осталось</div>
        <div class="card__value">24 354 м²</div></swiper-slide
      >
      <swiper-slide class="card">
        <div class="card__name">До скидки в 2% осталось</div>
        <div class="card__value">24 354 м²</div></swiper-slide
      >
      <swiper-slide class="card">
        <div class="card__name">До скидки в 2% осталось</div>
        <div class="card__value">24 354 м²</div></swiper-slide
      >
      <swiper-slide class="card">
        <div class="card__name">До скидки в 2% осталось</div>
        <div class="card__value">24 354 м²</div></swiper-slide
      >
    </swiper>
  </div>
</template>

<style>
.container {
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.cards.swiper {
  margin-top: 20px;
  overflow: visible;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 16px;
  color: white;
  min-height: 105px;
}
</style>
