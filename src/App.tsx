import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import PersonList from './components/PersonList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {/* import PersonList Component */}
      <PersonList />
    </div>
  )
}

export default App
