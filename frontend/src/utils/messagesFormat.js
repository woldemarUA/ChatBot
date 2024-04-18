export const messagesFormat = (messages) => {
  const result = messages.map((message) => {
    let output = '';

    for (const [key, value] of Object.entries(message))
      output += key === 'from' ? `${value}: ` : value;
    return output;
  });
  return result.join('\n');
};
