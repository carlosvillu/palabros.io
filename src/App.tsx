import { ReactElement, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Results from './components/Results'
import Search from './components/Search'

function App (): ReactElement {
  const [resultsState, setResultsState] = useState<string[]>([])
  return (
    <div className="App">
      <Header />
      <main className="App-Main debug">
        <Search onSearch={results => setResultsState(results)} />
        <Results results={resultsState} />
      </main>
    </div>
  )
}

export default App
