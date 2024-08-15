<template>
  <div class="service-rating">
    <div class="currentTime">{{ currentTime() }}</div>
    <div class="rating-header flex">
      <span></span>
      <p>您对小冰的服务还满意吗</p>
      <span></span>
    </div>
    <div class="rating-body flex">
      <div
        @click="handleClickFeed(item.feedback, store.session_id, index)"
        v-for="(item, index) in feed"
        :key="item.feedback"
        class="rating-img"
        :class="{ hasDisable: activeServe != index && show }"
      >
        <img
          :class="{ filterGraySale: activeServe === index }"
          :src="item.url"
        />
        <span>{{ item.text }}</span>
      </div>
    </div>
    <div class="rating-text">感谢您的评价</div>
  </div>
  <div class="service-textarea" v-if="textareaShow">
    <textarea
      v-model="textarea"
      class="textarea"
      placeholder="亲，详细描述出真实体验感受可以帮助小冰快速成长哦"
    >
    </textarea>
    <div class="rating-button">
      <div
        class="button-item helpful md-hover transition"
        @click="textareaShow = false"
      >
        取消
      </div>
      <div class="button-item helpful md-hover transition" @click="submitShow">
        提交
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { fetchData } from "../utils/axios";
import { useStore } from "../store";
let textarea: any = ref(null);
let textareaShow = ref(false);
let feedback = ref(0);
let session_id = ref(0);
const store = useStore();
let feed = reactive([
  { text: "失望", feedback: 2, url: "/images/disappointment.png" },
  { text: "一般", feedback: 1, url: "/images/generally.png" },
  { text: "满意", feedback: 0, url: "/images/satisfy.png" },
]);
let activeServe = ref(-1);
let show = ref(false);
let handleClickFeed = async (fee: any, ses: any, index: any) => {
  if (store.flag) return;
  if (!show.value) {
    activeServe.value = index;
    index !== 2 ? (textareaShow.value = true) : (textareaShow.value = false);
    feedback.value = fee;
    session_id.value = ses;
    show.value = !show.value;
  }
};
// 是否展示提交反馈框
let submitShow = async () => {
  if (textarea.value.trim() !== "") {
    let response = await fetchData.post("service_feedback", {
      feedback: feedback.value,
      session_id: session_id.value,
      message: textarea.value,
    });
    if (response.code == 0) {
      store.rating = false;
    }
    textareaShow.value = false;
    alert("反馈成功，感谢你的支持");
  } else {
    alert("内容不能为空！");
  }
};
let currentTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${date} ${hours}:${minutes}`;
};
</script>
<style scoped>
.rating-header {
  justify-content: center;
  gap: 20px;
}
.rating-header span {
  width: 25%;
  letter-spacing: 2px;
  border: 1.5px dashed #ccc;
}
.rating-body {
  margin: 20px 0px;
  justify-content: center;
  gap: 20px;
}
.rating-img span {
  font-size: 12px;
}
.rating-img img {
  width: 100%;
  filter: grayscale(1);
}
.rating-img {
  width: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s linear;
}
.rating-img:hover img {
  filter: none;
}
.rating-img:hover span {
  color: var(--hover-yellow);
}
.filterGraySale {
  filter: none !important;
}
.rating-text {
  color: rgba(153, 153, 153, 1);
  font-size: 12px;
  text-align: center;
}
.currentTime {
  text-align: center;
  font-size: 14px;
  color: rgba(153, 153, 153, 1);
  margin-bottom: 20px;
}
.service-rating {
  margin-bottom: 15px;
}
.service-textarea {
  text-align: center;
  position: relative;
}
.textarea {
  width: 400px;
  height: 200px;
  padding: 10px;
  font-size: 14px;
  border-radius: 10px;
  margin: 0 auto;
  outline: none;
}
.textarea:focus {
  border: 1px solid var(--main-dialog-borderFont-color);
}
.rating-button {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
}
.rating-button .button-item {
  width: 80px;
}
</style>
