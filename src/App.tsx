import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PackGratuit from './pages/PackGratuit'
import Bienvenue from './pages/Bienvenue'
import Merci from './pages/Merci'
import Skills from './pages/Skills'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pack-gratuit" element={<PackGratuit />} />
        <Route path="/bienvenue" element={<Bienvenue />} />
        <Route path="/merci" element={<Merci />} />
        <Route path="/skills" element={<Skills />} />
      </Routes>
    </>
  )
}
