<template>
  <footer class="footer">
    <div class="send">
      <input
        type="text"
        name="text"
        v-model="inputValue"
        @input="handleInput"
        placeholder="请输入您想要咨询的问题"
        @keyup.enter="handleClickSendMessage"
      />
      <button
        :class="{ disabled: store.isDisabled }"
        :disabled="store.isDisabled"
        class="send-message"
        @click="handleClickSendMessage"
      >
        发送
      </button>
      <transition name="slide-up">
        <ul v-if="showSuggestions" class="suggestions-list drop-down">
          <li
            v-for="item in filteredSuggestions"
            :key="item"
            @click="selectSuggestion(item.content)"
          >
            {{ item.content }}
          </li>
        </ul>
      </transition>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { fetchData } from "@/utils/axios.ts";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
import { useStore } from "../store";
const suggestions: any = ref([]);
const showSuggestions = ref(false);
const store = useStore();
const inputValue = ref("");
// 回车&手动发送
let handleClickSendMessage = () => {
  if (inputValue.value.trim() === "") return;
  if (store.flag) return;
  store.sendMessages(inputValue.value);
  store.addNewArray("", inputValue.value);
  showSuggestions.value = false;
  inputValue.value = "";
};
watch(inputValue, (newValue) => {
  if (newValue.trim() === "") {
    store.updateIsDisabled(true);
  } else {
    store.updateIsDisabled(false);
  }
});
// 自动发送
const question: any = computed(() => route.query.question);
if (question.value) {
  inputValue.value = question.value;
  handleClickSendMessage();
}
// es接口 输入文字 弹出智能推荐
// 异步请求数据
let focusDropDown = async () => {
  const response = await fetchData.post("es_query_data", {
    question: inputValue.value,
  });
  suggestions.value = response.data
  if (suggestions.value) {
    showSuggestions.value = true;
  }
};
const filteredSuggestions = computed(() => {
  return suggestions.value.slice(0, 5);
});
// 处理输入事件
let handleInput = () => {
  if (inputValue.value) {
    focusDropDown();
  } else {
    hideSuggestions();
  }
};
// 选择提示项
const selectSuggestion = (suggestion: string) => {
  inputValue.value = suggestion;
  showSuggestions.value = false;
};

// 隐藏提示项
const hideSuggestions = () => {
  showSuggestions.value = false;
};
</script>
<style scoped>
.disabled {
  cursor: default;
  pointer-events: none;
  color: #fff;
  background-color: #d3d3d3;
}
.drop-down {
  position: absolute;
  width: 100%;
  background: #fff;
  padding: 15px;
  box-sizing: border-box;
  left: 0px;
  right: 0px;
  bottom: 55px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
}
ul {
  margin: 0px;
}
li {
  list-style-type: none;
  height: 35px;
  line-height: 35px;
  transition: all 0.2s ease-in;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
li:hover {
  background-color: #eee;
}
/* 定义从下往上弹出的动画 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
