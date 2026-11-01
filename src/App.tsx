import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollManager from './components/ScrollManager';
import Home from './pages/Home';
import DailyList from './pages/DailyList';
import DailyDetail from './pages/DailyDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="min-h-screen bg-dark-900">
      <ScrollManager />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/daily" element={<DailyList />} />
          <Route path="/daily/:slug" element={<DailyDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
