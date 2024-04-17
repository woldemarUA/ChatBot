import Chat from './components/Chat';

import AppContextProvider from './context/AppContextProvider';

function App() {
  return (
    <AppContextProvider>
      <Chat />
    </AppContextProvider>
  );
}

export default App;
