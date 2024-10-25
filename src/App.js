// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Congratulations from './pages/Congratulations';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/congratulations" element={<Congratulations />} />
      </Routes>
    </>
  );
};

export default App;