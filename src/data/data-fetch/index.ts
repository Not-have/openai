import {
  aiKey
} from '@/utils'
import {
  IDataFetch,
  IParamsFetch
} from '../types'
import fixData from '../fix-data'

export default async function dataFetch(
  params: IParamsFetch[]
): Promise<IDataFetch | void> {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${aiKey()}`,
        "Content-Type": "application/json",
        "X-Title": "openai demo"
      },
      body: JSON.stringify({
        "model": "mistralai/mixtral-8x7b-instruct",
        // "messages": [
        //   {"role": "user", "content": "处理 json 对象"},
        // ],
        "messages": params
      })
    });

    const data = await res.json();
    return fixData(data)
  } catch (error) {
    console.error('Error:', error);
  }
}