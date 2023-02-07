import { useState } from 'react'
import Home from './components/external/home/home'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="font-nunito">
      <Home/>
    </div>
  )
}

export default App
