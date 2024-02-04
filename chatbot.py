import copy

from llama_cpp import Llama

llm = Llama(model_path="server/llama-2-7b-chat.Q5_K_M.gguf")
start_messages = [
    {"role": "system",
     "content": "You are a chatbot for the UK government's gov.uk website and must respond to users requests "
                "comprehensively about the services available on the site itself."},
]


def ask(messages):
    message_list = copy.deepcopy(start_messages)
    for message in messages["messages"]:
        print(message)
        message_list.append({"role": "user", "content": message})
    result_chat = llm.create_chat_completion(message_list)
    return result_chat["choices"][0]["message"]["content"]

# while True:
#    global result_chat
#    user_input = input("P: ")
#    if user_input == "stop": break
#    messages.append({"role": "user", "content": user_input})
#    result_chat = llm.create_chat_completion(messages)
#    print("L: "+result_chat["choices"][0]["message"]["content"])
