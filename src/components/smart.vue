<template>
  <div class="intelligentTips flex">
    <div class="intelligent-left smart">问题推荐:</div>
    <div class="intelligent-right flex">
      <div
        class="intelligent smart"
        v-for="item in store.smartArr"
        @click="handleClickSmart(item)"
      >
        {{ item }}
      </div>
      <!-- <div class="intelligent item">蓝牙怎么连</div>
            <div class="intelligent item">电脑蓝牙怎么连接</div>
            <div class="intelligent item">鼠标蓝牙怎么连接</div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "../store";
const store = useStore();
let handleClickSmart = (smartValue: string) => {
  if (store.flag) return;
  store.addNewArray("", smartValue);
  store.sendMessages(smartValue);
};

/*
 if (store.flag) return;
  store.addNewArray('',item.question);
  store.sendMessages(item.question);*/
</script>
<style scoped lang="scss">
.intelligentTips {
  margin-left: 55px;
  gap: 15px;
  width: 100%;
  .intelligent-left {
    font-weight: bold;
    &:hover {
      box-shadow: none;
      background-color: #eee;
    }
  }
  .intelligent-right {
    gap: 10px;
  }
}
.smart {
  cursor: pointer;
  background-color: #eee;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  transition: all 0.3s ease;
  color: #000;
  &:hover {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    background-color: #e3dede;
  }
}
</style>
