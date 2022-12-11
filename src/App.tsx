import { ReactElement, useState } from 'react'
import styles from './App.module.css'
import Header from './components/Header'
import Results from './components/Results'
import Search from './components/Search'

function App (): ReactElement {
  const [resultsState, setResultsState] = useState<string[]>([])
  return (
    <div className="App">
      <Header />
      <main className={styles.appMain}>
        <div className={styles.container}>
          <Search onSearch={results => setResultsState(results)} />
          <Results results={resultsState} />
        </div>
      </main>
    </div>
  )
}

export default App
