import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './pages/layout/Header'
import Footer from './pages/layout/Footer'
import Detail from './pages/Detail'
import Search from './pages/Search'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Detail />} />
        <Route path="/search/:keyword" element={<Search />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
