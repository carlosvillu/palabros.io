import PropTypes from 'prop-types'
import { ReactElement, useRef } from 'react'

import './index.css'

interface Props {
  onSearch: (results: string[]) => void
}

function Search ({ onSearch }: Props): ReactElement {
  const words = useRef<string | null>()

  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      pattern: { value: string }
    }

    if (words.current === undefined) {
      words.current = await fetch('/words.txt').then(async resp => await resp.text())
    }

    if (typeof words.current !== 'string') return

    const pattern = target.pattern.value
      .replaceAll('?', '.')
      .replaceAll(' ', '.')

    const matches = words.current.matchAll(new RegExp('\n' + pattern + '\n', 'g'))
    const solution = [...matches].map(match => match[0]).map(match => match.replace('\n', ''))
    onSearch(solution)
  }
  return <div className="Search debug">
    <h2>Palabros</h2>
    <h3>Puedes usar <strong>?</strong> como comodín para burcar tu palabra</h3>
    <form className="Search-Form" onSubmit={handleSubmit as unknown as () => void}>
      <input tabIndex={0} autoFocus type="search" enterKeyHint="search" placeholder='p.la..ota' autoComplete="off" autoCapitalize="off" autoCorrect="off" name="pattern" required />
      <button type='submit'>Search</button>
    </form>
  </div>
}

Search.propTypes = {
  onSearch: PropTypes.func
}

export default Search
