import type OpenAI from 'openai'
import { generateImage } from './tools/generateImage'
import { reddit } from './tools/reddit'
import { dadJoke } from './tools/dadJoke'

const getWeather = () => `hot, 90deg F`

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
  }
  switch (toolCall.function.name) {
    case 'generate_image':
      const image = await generateImage(input)
      return image

    case 'dad_joke':
      return dadJoke(input)

    case 'reddit':
      return reddit(input)

    case 'get_weather':
      return getWeather()
    default:
      throw new Error(`Unknown tool: ${toolCall.function.name}`)
  }
}
