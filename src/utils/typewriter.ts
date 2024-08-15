import { ref } from 'vue';

export function useTypewriter() {
    const displayedMessage = ref<string>('');
    const queue = ref<string[]>([]);
    const typing = ref<boolean>(false);

    const addMessage = (newMessage: string) => {
        queue.value.push(newMessage);
        typeNext();
    };

    const typeNext = () => {
        if (typing.value || !queue.value.length) return;

        typing.value = true;
        const nextMessage = queue.value.shift()!;
        let index = 0;

        const type = () => {
            if (index < nextMessage.length) {
                displayedMessage.value += nextMessage.charAt(index);
                index++;
                setTimeout(type, 100); // 调整打字速度
            } else {
                typing.value = false;
                typeNext(); // 打印队列中的下一个消息
            }
        };

        type();
    };

    return {
        displayedMessage,
        addMessage,
    };
}
