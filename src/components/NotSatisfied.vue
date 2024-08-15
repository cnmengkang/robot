<template>
  <div class="NotSatisfied relative">
    <div class="no-satisfied-box bgColor">
      <div class="no-satisfied-desc">
        亲，可以告诉小冰不满意的地方吗？小冰会努力改进的
      </div>
      <div class="no-satisfied-list">
        <div
          @click="handleClickSatisfied(item)"
          class="no-list-item md-hover transition"
          :class="{
            solved: activeTab == item.id,
            hasDisable: activeTab !== item.id && activeTab !== 0,
          }"
          v-for="item in satisfied"
          :key="item.id"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
    <span class="timer">{{ store.time }}</span>
    <div class="customer-service">
      很抱歉没有解决您的问题，点击进入 ，<span
        @click="handleClickArtificial"
        class="artificial"
        >人工客服</span
      >
    </div>
  </div>
</template>
<!-- href="https://www.madaogo.com/kf" target="_blank" -->
<script setup lang="ts">
import { fetchData } from "../utils/axios";
import { ref } from "vue";
import { useStore } from "../store";
const props = defineProps({
  collect_id: {
    type: Number,
    require: true,
  },
  dataIndex: {
    type: Number,
    require: true,
  },
});
const activeTab: any = ref(0);
const store = useStore();
let satisfied = ref([
  { id: 1, text: "答非所问" },
  { id: 2, text: "方案太复杂" },
  { id: 3, text: "未解决问题" },
]);
let handleClickSatisfied = async (item: any) => {
  activeTab.value = item.id === activeTab.value ? 0 : item.id; // 切换选中状态
  /*
    # todo 更新不满意类型反馈：
    # url = 'http://localhost:18888/api/v1/devops/update_dissatisfy'
    # "collect_id": 1,  # 收集问答的ID
    # "dissatisfy": 1,  # 不满意类型：0未选择  1答非所问  2方案太复杂  3未解决问题
  */
  const response = await fetchData.post("update_dissatisfy", {
    collect_id: props.collect_id,
    dissatisfy: item.id,
  });
  store.addNewArray(response.data, "");
};
let handleClickArtificial = async () => {
  let artificial = null;
  activeTab.value === 0 ? artificial = 0 : artificial = 1;
  const response = await fetchData.post("update_artificial", {
    collect_id: props.collect_id,
    artificial: artificial,
  });
  console.log(response)
  const url = 'https://www.madaogo.com/rgkf';
  window.open(url, '_blank');
};
</script>
<style scoped>
.artificial {
  color: var(--main-dialog-borderFont-color);
  cursor: pointer;
}
.artificial:hover{
  text-decoration: underline;
}
</style>
