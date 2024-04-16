import createVectorStore from './vectorStore/vectorStore.js';
import openAiChat from './llm/openAiModel.js';
import { standalonePrompt } from './prompts/standalonePrompt.js';
import { userPrompt } from './prompts/userPrompt.js';
// Index documents
// PARSE SATNDALONE TO THE PASSED TO THE RETRIEVER directly in the pipe
import { StringOutputParser } from '@langchain/core/output_parsers';

// utilties import
import { combineDocuments } from './utilities/convertors.js';
import {
  RunnablePassthrough,
  RunnableSequence,
} from '@langchain/core/runnables';

export async function main() {
  try {
    const llm = openAiChat();
    const vectorStore = await createVectorStore('chatbot');
    const retriever = vectorStore.asRetriever();

    // runnable Sequence
    const standAloneQuestionChain = RunnableSequence.from([
      standalonePrompt,
      llm,
      new StringOutputParser(),
    ]);

    const retrieverChain = RunnableSequence.from([
      (prevResult) => prevResult.standaloneQuestion,
      retriever,
      combineDocuments,
    ]);
    const answerChain = RunnableSequence.from([
      userPrompt,
      llm,
      new StringOutputParser(),
    ]);

    const chain = RunnableSequence.from([
      {
        standaloneQuestion: standAloneQuestionChain,
        originalInput: new RunnablePassthrough(),
      },
      {
        context: retrieverChain,
        question: ({ originalInput }) => originalInput.prompt,
      },
      answerChain,
    ]);
    const response = chain.invoke({
      prompt:
        'What are the technical requirements for running Scrimba? I only have a very old laptop which is not that powerful.',
      // 'What is the method of the education',
    });

    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function init() {
  try {
    const vectorStore = await createVectorStore('chatbot');
    const ids = await vectorStore.addDocuments(docs);
    return ids;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// CHAIN
// after retriever run combine documents for have the string as a result of the content matching
// const standAloneChain = standalonePrompt
//   .pipe(llm)
//   .pipe(new StringOutputParser())
//   .pipe(retriever)
//   .pipe(combineDocuments)
//   .pipe(userPrompt);

// const response = await standAloneChain.invoke({
//   prompt:
//     'What are the technical requirements for running Scrimba? I only have a very old laptop which is not that powerful.',
// });

// const llm = openAiChat('gpt-4-turbo');

// Can a very old laptop meet the technical requirements for running Scrimba?
// What are the minimum specifications needed to run Scrimba on an older, less powerful laptop?"
// "What are the technical requirements for running Scrimba on a very old, less powerful laptop?"
// "What technical requirements are needed to run Scrimba?"
// const docs = await dataLoader('/uploads/scrimba.txt');
// const response = await elasticClient.search({
//   index: 'chatbot',
//   body: {
//     query: {
//       match_all: {}, // gets all docs
//     },
//   },
// });
// let documents = response.hits.hits.map((hit) => hit);
// return documents;
