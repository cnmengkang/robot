import { defineStore } from 'pinia';
import { postWithEventSource } from "../utils/sse";
import { fetchData } from "../utils/axios";
import { getCurrentTime } from '../utils/currentTIme';
// import { useTypewriter } from '../utils/typewriter';
export const useStore = defineStore('myStore', {
    state: () => ({
        isDisabled: true,
        message: "" as string, // 将 message 的类型定义为 Typed | null
        flag: false, //正在输出文本时，禁止发送其它操作
        session_id: null,//机器回复会生成一个session_id
        session_idShow: true,//机器回复会生成一个session_id
        robotContent: '',//机器人回复的答案
        userContent: '',//用户的提问
        feedback: false,//已解决状态
        rating: false,//服务评价状态
        time: "" as string,
        interval: null as ReturnType<typeof setInterval> | null,
        index: 0,
        smartArr: [],
        messages: [{ smart: false, rating: false, index: 0, id: new Date().getTime(), popular: true, user: '', robot: "您好，小冰为您服务！请您随意提问，如果您的问题我暂时无法解决，只需在输入框中输入“人工客服”，即可得到我们专业客服团队的进一步详细咨询和帮助！", satisfied: false, feedback: false, grateful: false, collect_id: 0, userTime: getCurrentTime(), robotTime: getCurrentTime() }],
        // 存储当前页面数据，刷新则丢失。
        queue: [],
        typing: false
    }),
    actions: {
        // 每次发送消息更新数据
        addNewArray(robot: string, user: string,) {
            const startIndex = this.messages.length;
            const newArray: any = { rating: false, index: startIndex, id: new Date().getTime(), popular: false, user: user, robot: robot, satisfied: false, feedback: false, grateful: false, collect_id: 0, userTime: getCurrentTime(), robotTime: getCurrentTime() }
            this.messages.push(newArray)
        },
        // 更新未解决状态
        updateArraySatisfied(index: any) {
            this.messages[index].satisfied = true;
        },
        // 更新未解决状态
        updateArrayGrateful(index: any) {
            this.messages[index].grateful = true;
        },
        // 处理发送按钮true&false状态
        updateIsDisabled(state: boolean) {
            this.isDisabled = state;
        },
        // 更新当前问题
        updateIsMessage(text: any) {
            this.message = text;
        },
        // 处理对话数据
        sendMessages(value: any) {
            this.isDisabled = true;
            this.flag = true;
            postWithEventSource('spark/chat_bot', { prompt: value, history: this.recordContext(), session_id: this.session_id }, (response: any) => {
                // console.log('response', response)
                this.message = response.content;
                if (response.status !== 1) {
                    const index = this.messages.length - 1;
                    this.messages[index].robotTime = getCurrentTime();
                    this.messages[index].robot = this.message;
                    this.robotContent = this.messages[index].robot;
                    this.userContent = this.messages[index].user;
                    if (response.feedback != 0) {
                        this.messages[index].feedback = true;
                        this.messages[index].smart = true
                    }
                    if (this.feedback === false) {
                        this.messages[index - 1].feedback = false;
                    } else {
                        this.feedback = false;
                    }
                    if (index > 1 && this.rating) {
                        this.messages[index - 1].rating = false;
                    }
                    this.messages[index].rating = true;
                    if (!this.session_id && this.session_idShow) {
                        this.session_id = response.session_id;
                        this.session_idShow = false;
                    }
                    this.message = "" as string;
                    this.getCollectData(value, response.content);  //收集用户数据
                    this.getAskingQuestions(value)  //发送结束推荐提问
                    this.flag = false;
                }
            });
        },
        // 收集用户数据
        async getCollectData(question: any, assistant: any) {
            const response = await fetchData.post("collect_data", { question: question, assistant: assistant, session_id: this.session_id });
            const index = this.messages.length - 1;
            this.messages[index].collect_id = response.collect_id;
        },
        // 发送带有上下文
        recordContext() {
            if (this.messages.length > 2) {
                return [{ "role": "user", "content": this.userContent }, { "role": "assistant", "content": this.robotContent }];
            } else {
                return [];
            }
        },
        // 获取当前时间
        currentTime() {
            const currentDate = new Date();
            const hours = String(currentDate.getHours()).padStart(2, '0'); // 保证两位数，不足补0
            const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // 保证两位数，不足补0
            // 返回格式化后的时间字符串
            this.time = `${hours}:${minutes}`;
        },
        // 继续提问
        async getAskingQuestions(ques: any) {
            const response = await fetchData.post("chat_guide", { prompt: ques })
            this.smartArr = response.data;
            let index = this.messages.length - 1;
            if (this.feedback === false && index > 1) {
                this.messages[index - 1].smart = false
            } else {
                this.feedback = false;
            }
        },
    }
});

