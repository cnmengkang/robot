<template>
  <div class="recommendations">
    <div class="tab-container">
      <!-- 使用 v-for 指令循环渲染标签 -->
      <button
        class="tab"
        :class="{ active: activeTab === tab.assort_id }"
        @click="handleClickTabs(tab, tab.assort_id)"
        v-for="tab in tabs"
        :key="tab.assort_id"
      >
        {{ tab.title }}
      </button>
    </div>
    <div class="tab-content">
      <div class="Ask-question flex">
        <div class="question">
          <img style="width: 80px" src="/public/images/question.png" alt="" />
        </div>
        <div
          class="refresh flex md-hover-yellow transition"
          @click="handleClickRefresh"
        >
          <!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>
          <svg
            enable-background="new 0 0 128 128"
            height="18px"
            width="18px"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 128 128"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g>
              <g>
                <path
                  d="M72.511,90.536c-0.386,1.035,0.14,2.187,1.175,2.573l16.745,6.248c-7.854,5.62-17.1,8.594-26.804,8.594    c-25.435,0-46.127-20.693-46.127-46.128c0-1.104-0.896-2-2-2s-2,0.896-2,2c0,27.64,22.487,50.128,50.127,50.128    c9.725,0,19.026-2.75,27.111-7.966l-3.087,14.551c-0.229,1.08,0.461,2.142,1.541,2.371c0.14,0.03,0.279,0.044,0.417,0.044    c0.925,0,1.755-0.645,1.954-1.586l4.69-22.105l-21.17-7.898C74.051,88.977,72.898,89.501,72.511,90.536z M64.375,16.322    c-9.728,0-19.03,2.749-27.11,7.963l3.086-14.548c0.229-1.081-0.46-2.142-1.541-2.371c-1.077-0.229-2.143,0.461-2.371,1.542    l-4.69,22.104l21.17,7.898c0.23,0.086,0.467,0.127,0.699,0.127c0.811,0,1.573-0.498,1.874-1.302    c0.386-1.034-0.14-2.187-1.175-2.573l-16.747-6.25c7.85-5.618,17.097-8.591,26.806-8.591c25.434,0,46.125,20.691,46.125,46.125    c0,1.104,0.896,2,2,2s2-0.896,2-2C114.5,38.808,92.014,16.322,64.375,16.322z"
                />
              </g>
            </g>
          </svg>
          换一批
        </div>
      </div>
      <div class="content">
        <div
          class="content-item"
          @click="handleClickRecommend(item)"
          v-for="item in contentData"
          :key="item.id"
        >
          <span class="md-hover-yellow transition">{{ item.question }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { fetchData } from "../utils/axios";
import { useStore } from "../store";
const store = useStore();
const activeTab = ref(1);
const { data } = defineProps(["data"]);
let contentData: any = ref(data[1].data);
const tabs = ref([
  // 标签数组，每个标签包含标题和内容
  { title: "热门推荐", assort_id: 1 },
  { title: "产品专区", assort_id: 2 },
  { title: "服务保障", assort_id: 3 },
  { title: "软件安装", assort_id: 4 },
]);
// 定义点击刷新按钮的方法
const handleClickRefresh = async () => {
  if (store.flag) return;
  const response = await fetchData.post("refresh_enum_question", {
    assort_id: activeTab.value,
  });
  contentData.value = response.data;
};
const handleClickTabs = (item: any, index: number) => {
  data.forEach((element: any) => {
    if (item.assort_id === element.assort_id) {
      contentData.value = element.data;
      activeTab.value = index;
    }
  });
};
//处理点击发送数据
let handleClickRecommend = (item: any) => {
  if (store.flag) return;
  store.addNewArray("", item.question);
  store.sendMessages(item.question);
};
</script>
<style scoped>
.content-item {
  font-size: 14px;
  padding: 5px 0px;
  color: var(--main-dialog-borderFont-color);
  cursor: pointer;
}
.refresh {
  cursor: pointer;
  font-size: 14px;
}
.refresh:hover svg {
  fill: var(--hover-yellow);
}
</style>
