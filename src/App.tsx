import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StudioGrid } from './components/StudioGrid'
import { ObsidianPage } from './pages/ObsidianPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudioGrid />} />
        <Route path="/obsidian" element={<ObsidianPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
