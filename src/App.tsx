import { ReactElement, useRef, useState } from 'react'
import './App.css'

function App (): ReactElement {
  const [solutionState, setSolutionState] = useState<string[]>([])
  const words = useRef<string | null>()
  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      pattern: { value: string }
    }

    console.log(target.pattern.value)
    if (words.current === undefined) {
      words.current = await fetch('/words.txt').then(async resp => await resp.text())
    }

    if (typeof words.current !== 'string') return

    const matches = words.current.matchAll(new RegExp('\n' + target.pattern.value + '\n', 'g'))
    const solution = [...matches].map(match => match[0]).map(match => match.replace('\n', ''))
    setSolutionState(solution)
  }

  return (
    <div className="App">
      <h1>Palabros</h1>
      <form onSubmit={handleSubmit as unknown as () => void}>
        <label>Patrón de busqueda:</label>
        <input tabIndex={0} autoFocus type="search" enterKeyHint="search" placeholder='p.la..ota' autoComplete="off" autoCapitalize="off" autoCorrect="off" name="pattern" required />
        <button type='submit'>Search</button>
      </form>
      {(solutionState.length > 0) && <div>
        <h2>Coincidencias</h2>
        <ol>
          {solutionState.map(word => <li key={word}>{word}</li>)}
        </ol>
      </div>}

    </div>
  )
}

export default App
