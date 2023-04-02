import { useCallback } from 'react';
import './App.css';
import { Chat } from './screens/Chat';

function App() {
  const scrollToBottom = useCallback(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  scrollToBottom();
  return (
    <div className='App'>
      <Chat />
    </div>
  );
}

export default App;
