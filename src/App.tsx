import React from 'react';
import { Toaster } from 'sonner';
import ContestList from './ContestList';

function App() {
  return (
    <div className="App">
      <Toaster position="top-right" richColors />
      <ContestList />
    </div>
  );
}

export default App;
