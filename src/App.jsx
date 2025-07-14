import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './pages/layout/Header'
import Footer from './pages/layout/Footer'
import Search from './pages/Search'
import Favorite from './pages/Favorite'
import Suggestions from './pages/Suggestions'
import History from './pages/History'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:keyword" element={<Search />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/history" element={<History />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
