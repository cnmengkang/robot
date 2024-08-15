<template>
  <div class="carousel">
    <div
      v-for="(, index) in items"
      :key="index"
      :class="['carousel-item', { active: index === currentIndex }]"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "../store";
const store = useStore();
let items = ref([1, 2, 3]);
let currentIndex = ref(0);
let timer: any = ref(null);
onMounted(() => {
  timer.value = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % items.value.length;
    if (store.message) clearInterval(timer.value);
  }, 300); // 2秒钟切换一次
});
</script>
<style scoped>
.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-item {
  width: 10px;
  height: 10px;
  background-color: #000; /* 圆点颜色 */
  border-radius: 50%; /* 将方形元素设置为圆形 */
  margin: 0 5px; /* 间距 */
  transition: transform 0.5s; /* 变换过渡效果 */
}

.carousel-item.active {
  transform: scale(1.5); /* 当前项放大 */
}

.carousel-item:not(.active) {
  transform: scale(0.8); /* 其他项缩小 */
}
</style>
