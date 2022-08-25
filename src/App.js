import React, { useState } from 'react';
import './App.css';
import Modal from './Modal';

function App() {
  const [modalActive, setModalActive] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
        <button className='opnf' onClick={() => setModalActive(true)}>Open Form</button>
        <Modal active={modalActive} setActive={setModalActive}/> 
      </header>
    </div>
  );
}

export default App;
