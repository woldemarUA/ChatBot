import React from 'react';

import { ChatBotProvider } from './ChatBotProvider';
function AppContextProvider({ children }) {
  return <ChatBotProvider>{children}</ChatBotProvider>;
}

export default AppContextProvider;
