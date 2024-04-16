const translationPrompt = PromptTemplate.fromTemplate(translationTemplate)

const punctuationChain = RunnableSequence.from([
punctuationPrompt,
llm,
new StringOutputParser()
])
const grammarChain = RunnableSequence.from([
grammarPrompt,
llm,
new StringOutputParser()
])
const translationChain = RunnableSequence.from([
translationPrompt,
llm,
new StringOutputParser()
])

const chain = RunnableSequence.from([
{
punctuated_sentence: punctuationChain,
original_input: new RunnablePassthrough()
},
{
grammatically_correct_sentence: grammarChain,
language: ({ original_input }) => original_input.language
},
translationChain
])

const response = await chain.invoke({
sentence: 'i dont liked mondays',
language: 'french'
})
