import { OpenAI } from '@langchain/openai';
import { VectorDBQAChain } from 'langchain/chains';
import { Document } from '@langchain/core/documents';

import createVectorStore from './vectorStore.js';

// Index documents

export async function loadIntoVectorStore() {
  try {
    const vectorStore = await createVectorStore('chatbot');

    return;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
