import { PromptTemplate } from '@langchain/core/prompts';

// const template =
//   'Given a question, convert it to a standalone question you can use the converstaion history in doing that. Question: {prompt}. Converssation history: {convHistory} Standalone question:';

const standaloneQuestionTemplate = `
  As a skilled conversational agent, your task is to reformulate the given question into a standalone question that incorporates relevant information from the previous conversation history. This allows the standalone question to be clear and fully understandable on its own.
  Original Question: {prompt}
  Conversation History: {convHistory}
  Reformulated Standalone Question:
`;

export const standalonePrompt = PromptTemplate.fromTemplate(
  standaloneQuestionTemplate
);

// const standaloneQuestionTemplate = `
//   As a multilingual conversational agent, your task is to reformulate the given question into a standalone question in the same language it was originally asked. Use relevant information from the previous conversation history to ensure the reformulated question is clear and fully understandable on its own.
//   Original Question: {prompt}
//   Conversation History: {convHistory}
//   Language of the Original Question: {language}
//   Reformulated Standalone Question:
// `;
