import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DocumentSelection from './pages/DocumentSelection'
import DocumentForm from './pages/DocumentForm'
import DocumentPreview from './pages/DocumentPreview'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/documents" element={<DocumentSelection />} />
        <Route path="/documents/:docType/form" element={<DocumentForm />} />
        <Route path="/documents/:docType/preview" element={<DocumentPreview />} />
      </Routes>
    </Router>
  )
}

export default App
