# -*- coding:utf-8 -*-
# @Author：王巧建
# @file：spark_demo.py
# @data：2024/03/20
import base64
import json
import requests
import sseclient


def spark_streaming():
    history = []
    headers = {
        'Accept': 'text/event-stream',
    }
    url = 'http://192.168.2.217:18888/api/v1/spark/chat_bot'
    # url = 'http://127.0.0.1:18888/api/v1/spark/chat_bot1?prompt=你好'

    body = {
        "prompt": "AM50的语音键在哪？",
        "history": history,
    }
    response = requests.post(url, stream=True, headers=headers, data=json.dumps(body))
    # response = requests.get(url, stream=True, headers=headers)
    client = sseclient.SSEClient(response)
    for event in client.events():
        print(json.loads(event.data), end="\n", flush=True)
        print(json.loads(event.data).get("content"),
              "\n-------------------------------------------separate------------------------------------------------")


if __name__ == '__main__':
    spark_streaming()
    # import requests

    # todo 上传原始数据（增量）：
    # url = 'http://localhost:18888/api/v1/devops/upload_file'
    # file_path = r'D:\CheckoutGit\ServiceBot\data\客服机器人对话一万条.xlsx'
    # with open(file_path, 'rb') as file:
    #     response = requests.post(url, files={'file': file})
    # print(response.json())

    # todo 增加原始数据（单条）：
    # url = 'http://localhost:18888/api/v1/devops/add_source_data'
    # body = {
    #     "question": "新增问题",
    #     "answer": "新增答案",
    # }
    # response = requests.post(url, data=json.dumps(body))
    # print(response.json())

    # todo 删除原始数据（单条）：
    # url = 'http://localhost:18888/api/v1/devops/add_source_data'
    # body = {
    #     "source_id": 1,
    # }
    # response = requests.post(url, data=json.dumps(body))
    # print(response.json())

    # todo 清空原始数据：
    # url = 'http://localhost:18888/api/v1/devops/clear_source_data'
    # response = requests.post(url)
    # print(response.json())

    # todo 更新原始数据：
    # url = 'http://localhost:18888/api/v1/devops/update_source_data'
    # body = {
    #     "source_id": 3,
    #     "question": "新增问题1",
    #     "answer": "新增答案1",
    # }
    # response = requests.post(url, data=json.dumps(body))
    # print(response.json())

    # todo 获取原始数据（单条）：
    # url = 'http://localhost:18888/api/v1/devops/get_source_data'
    # body = {
    #     "source_id": 3,
    # }
    # response = requests.post(url, data=json.dumps(body))
    # print(response.json())

    # todo 获取原始数据（分页）：
    # url = 'http://192.168.2.217:18888/api/v1/devops/get_data_source_by_page'
    # body = {
    #     "page": 0,
    #     "size": 10,
    # }
    # response = requests.post(url, data=json.dumps(body))
    # print(response.json())

    # todo 原始数据转向量任务：
    # url = 'http://localhost:18888/api/v1/devops/embedding_task'
    # response = requests.get(url)
    # print(response.json())

    # todo 向量存储和构建任务：
    # url = 'http://localhost:18888/api/v1/devops/vector_task'
    # response = requests.get(url)
    # print(response.json())

    # todo 常见问题：
    # url = 'http://localhost:18888/api/v1/devops/enum_question'
    # response = requests.get(url)
    # print(response.json())

    # todo 刷新常见问题：
    # url = 'http://localhost:18888/api/v1/devops/refresh_enum_question'
    # body = {
    #     "assort_id": 0,
    # }
    # response = requests.post(url, data=json.dumps(body))
    # print(response.json())

    # todo 收集问答反馈：
    # url = 'http://localhost:18888/api/v1/devops/collect_data'
    # body = {
    #     "question": "用户问题",
    #     "assistant": "机器人答案",
    #     "is_resolve": 0,
    # }
    # response = requests.post(url, data=json.dumps(body))
    # print(response.json())

    # todo 更新收集问答反馈：
    # url = 'http://localhost:18888/api/v1/devops/update_collect_data'
    # body = {
    #     "collect_id": 0,
    #     "dissatisfy": 1,
    # }
    # response = requests.post(url, data=json.dumps(body))
    # print(response.json())

    # todo 服务反馈：
    # url = 'http://localhost:18888/api/v1/devops/service_feedback'
    # body = {
    #     "feedback": 0,
    # }
    # response = requests.post(url, data=json.dumps(body))
    # print(response.json())
