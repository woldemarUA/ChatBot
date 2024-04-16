import { ChatOpenAI } from '@langchain/openai';

const openAIApiKey = process.env.OPENAI_API_KEY;

export default function openAiChat(model = 'gpt-3.5-turbo') {
  const llm = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    model,
  });

  return llm;
}
