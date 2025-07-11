import './App.css'
import { Layout } from './components'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
    <Layout>
      <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/movies/:id" element={<h1>Movie</h1>} />
          <Route path="/movies/search" element={<h1>Search</h1>} />
      </Routes>
    </Layout>
    </>
  )
}

export default App
