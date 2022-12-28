import { ReactElement, useState } from 'react'
import styles from './App.module.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Results from './components/Results'
import Search from './components/Search'
import SEOSection from './components/SEOSection'

function App (): ReactElement {
  const [resultsState, setResultsState] = useState<string[]>([])
  return (
    <div className="App">
      <Header />
      <main className={styles.appMain}>
        <div className={styles.container}>
          <Search onSearch={results => setResultsState(results)} />
          <Results results={resultsState} />
          <SEOSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
