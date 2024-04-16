import { PromptTemplate } from '@langchain/core/prompts';

const template =
  'Given a question, convert it to a standalone question. question: {prompt} standalone question:';

export const standalonePrompt = PromptTemplate.fromTemplate(template);
