<template>
  <section class="left">
    <div class="logo flex">
      <img class="intelligent" src="/public/images/intelligent.png" alt="" />
      <h2>智能客服小冰</h2>
    </div>
    <div class="hot">
      <div class="hot-header flex">
        <img src="/public/images/hot.png" alt="" />
        <h2 class="hot-title">热门问题</h2>
      </div>
      <ul>
        <li
          @click="handleClickLeftList(item)"
          v-for="item in data"
          :key="item.id"
          class="md-hover transition"
        >
          <span class="garden"></span>
          {{ item.question }}
        </li>
      </ul>
    </div>
    <div class="left-footer">
      <img src="/public/images/robotMax.png" alt="" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useStore } from "../store";
const store = useStore();
const { data } = defineProps(["data"]);
let handleClickLeftList = async (item: any) => {
  if (store.flag) return;
  store.addNewArray('',item.question);
  store.sendMessages(item.question);
};
</script>
