import { fetchEventSource } from "@microsoft/fetch-event-source";
import { BASE_URL } from '../../env';
export async function postWithEventSource(url: any, data: any, onDataReceived: any) {
    const controller = new AbortController();
    await fetchEventSource(`${BASE_URL}${url}`, {
        method: "POST",
        headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", "Connection": "keep-alive" },
        body: JSON.stringify(data),
        signal: controller.signal,
        openWhenHidden: true,
        onmessage(event) {
            try {
                const jsonData = JSON.parse(event.data);
                onDataReceived(jsonData);
            } catch (error) {
                console.log('JSON 解析错误:', error);
                console.log('JSON 解析错误:', event.data);
            }
        },
        onerror(error) {
            console.error("连接错误:", error);
        },
        onclose() {
            console.log("连接关闭");
        }

    });
}
export { fetchEventSource };


