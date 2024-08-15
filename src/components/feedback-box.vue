<template>
  <div class="feedback-box flex bgColor">
    <div class="feedback-desc">你的问题是否已解决？</div>
    <div class="feedback-buttons flex">
      <div
        class="button-item helpful md-hover transition"
        :class="{ solved: feedBack === true, hasDisable: feedBack === false }"
        @click="handleClickResolved(true, 1)"
      >
        已解决
      </div>
      <div
        class="button-item useless md-hover transition"
        :class="{ solved: feedBack === false, hasDisable: feedBack === true }"
        @click="handleClickResolved(false, 2)"
      >
        未解决
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { fetchData } from "../utils/axios";
import { useStore } from "../store";
const store = useStore();
const props = defineProps({
  dataIndex: {
    type: Number,
    require: true,
  },
  collect_id: {
    type: Number,
    require: true,
  },
});
let feedBack = ref(null);
let handleClickResolved = (resolved: any, is_resolve: any) => {
  if (store.flag) return;
  feedBack.value = resolved;
  if (!resolved) {
    // 未解决
    store.updateArraySatisfied(props.dataIndex);
  } else {
    store.updateArrayGrateful(props.dataIndex);
    // 已解决
  }
  store.feedback = true;
  store.currentTime()
  handleIsResolved(is_resolve);
};
// 处理是否解决
let handleIsResolved = async (is_resolve: any) => {
  if (store.flag) return;
  const response = await fetchData.post("update_resolve", {
    collect_id: props.collect_id,
    is_resolve: is_resolve,
  });
  console.log(response);
};
</script>