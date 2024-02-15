import React from 'react';
import Home from './pages/Home';

function App() {
  return (
    <div style={styles.container}>
      <Home />
    </div>
  );
}

const styles = {
  container: {
    margin: 'auto',
    width: '50%',
    height: '100%',
    padding: '20px',
  }
};

export default App;
