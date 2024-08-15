<template>
  <main class="main">
    <Left :data="myState.hotSearch" />
    <section class="right">
      <header class="header"><Header /></header>
      <main class="container">
        <div
          class="dialogue"
          ref="scrollContent"
          v-for="(item, index) in store.messages"
          :key="item.id"
          :data-index="index"
        >
          <!-- 用户提问 -->
          <div class="dialogue-right" v-if="item.user">
            <div class="relative">
              <div class="robot-reply bgColor">{{ item.user }}</div>
              <span class="timer">{{ item.userTime }}</span>
            </div>
            <div class="avatar flex">
              <img src="/public/images/user.png" alt="" />
              <span class="nike-name" style="color: var(--main-color)">我</span>
            </div>
          </div>
          <!-- 用户提问 -->
          <!-- 机器回答 -->
          <div class="dialogue-left" :data-index="index" v-if="item.robot">
            <div class="avatar flex">
              <img src="/public/images/robot.png" alt="" />
              <span class="nike-name">小冰</span>
            </div>
            <div class="relative">
              <div
                class="robot-reply bgColor"
                v-html="renderMarkdown(item.robot)"
              ></div>
              <span class="timer">{{ item.robotTime }}</span>
            </div>
            <!-- 智能推荐问题 -->
            <intelligentTips v-if="item.smart" />
          </div>
          <!-- 机器回答 -->
          <!-- ======================== -->
          <!-- 回答加载动画 -->
          <div class="dialogue-left" v-else-if="!store.message">
            <div class="avatar flex">
              <img src="/public/images/robot.png" />
              <span class="nike-name">小冰</span>
            </div>
            <div class="robot-reply bgColor">
              <dot />
            </div>
          </div>
          <!-- 回答加载动画 -->
          <!-- 当前正在输入 -->
          <div class="dialogue-left" v-else="store.message">
            <div class="avatar flex">
              <img src="/public/images/robot.png" alt="" />
              <span class="nike-name">小冰</span>
            </div>
            <div class="relative">
              <div
                class="robot-reply bgColor replay"
                v-html="renderMarkdown(store.message)"
              ></div>
            </div>
          </div>
          <!-- 当前正在输入 -->
          <!-- 热门推荐 -->
          <div class="dialogue-left" v-if="item.popular">
            <div class="avatar flex">
              <img src="/public/images/robot.png" alt="" />
              <span class="nike-name">小冰</span>
            </div>
            <div class="relative box">
              <Recommend
                v-if="myState.recommend.length > 0"
                :data="myState.recommend"
              />
              <span class="timer">{{ item.userTime }}</span>
            </div>
          </div>
          <!-- 热门推荐 -->
          <!--已解决为解决  -->
          <div class="dialogue-left" v-if="item.feedback">
            <div class="avatar flex">
              <img src="/public/images/robot.png" alt="" />
              <span class="nike-name">小冰</span>
            </div>
            <div class="relative">
              <feedbackBbox
                :data-index="item.index"
                :collect_id="item.collect_id"
              />
              <span class="timer">{{ item.robotTime }}</span>
            </div>
          </div>
          <!--已解决为解决  -->
          <!-- 为解决弹出 -->
          <div class="dialogue-left" v-if="item.satisfied">
            <div class="avatar flex">
              <img src="/public/images/robot.png" alt="" />
              <span class="nike-name">小冰</span>
            </div>
            <NotSatisfied
              :collect_id="item.collect_id"
              :data-index="item.index"
            />
          </div>
          <!-- 为解决弹出 -->
          <!-- 感谢反馈 -->
          <div class="dialogue-left" v-if="item.grateful">
            <div class="avatar flex">
              <img src="/public/images/robot.png" alt="" />
              <span class="nike-name">小冰</span>
            </div>
            <div class="relative robot-reply">
              <div class="bgColor">感谢您的反馈，小冰会继续努力~</div>
              <span class="timer">{{ store.time }}</span>
            </div>
          </div>
          <!-- 感谢反馈 -->
        </div>
        <!-- 评价是否满意 -->
        <!-- <rating v-if="store.rating" /> -->
        <rating v-if="store.rating" />
        <!-- 评价是否满意 -->
      </main>
      <Footer />
    </section>
  </main>
  <div class="version">{{ ver }}</div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import dot from "./dot.vue";
import Left from "./Left.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import rating from "./rating.vue";
import { useStore } from "../store";
import Recommend from "./Recommend.vue";
import { fetchData } from "../utils/axios";
import NotSatisfied from "./NotSatisfied.vue";
import feedbackBbox from "./feedback-box.vue";
import intelligentTips from "./smart.vue";
import MarkdownIt from "markdown-it";
const store = useStore();
let ver = ref(null);
let myState = reactive({
  hotSearch: [],
  recommend: [],
});
let scrollContent: any = ref(null);
onMounted(() => {
  handleGetList();
  getVersion();
});
// 获取list数据
let handleGetList = async () => {
  const response = await fetchData.get("enum_question", {});
  myState.hotSearch = response.data[0].data;
  myState.recommend = response.data;
};
// 滚动条事件
let setScrollContainer = () => {
  const lastMessage = scrollContent.value[scrollContent.value.length - 1];
  if (lastMessage) {
    lastMessage.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "end",
    });
  }
};
// 获取版本号
let getVersion = async () => {
  fetch("./version.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      ver.value = data.version;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};
// 监听当前正在回答的消息，有变化执行滚动条
watch(
  () => store.message,
  () => {
    requestAnimationFrame(setScrollContainer);
  }
);
// 监听历史数据，有变化执行滚动条
watch(
  () => store.messages,
  () => {
    requestAnimationFrame(setScrollContainer);
  },
  { deep: true }
);
// markdown解析数据
let renderMarkdown = (content: any) => {
  const md = new MarkdownIt({ breaks: true });
  return md.render(content);
};
// 监听rating
let timer: any = null;
let timerTotal = ref(120000);
watch(
  () => store.message,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        store.rating = true;
      }, timerTotal.value);
    }
  },
  { deep: true }
);
</script>
