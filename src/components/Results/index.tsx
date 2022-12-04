import { ReactElement } from 'react'
import PropTypes from 'prop-types'

interface Props {
  results: string[]
}

function Results ({ results = [] }: Props): ReactElement {
  return <div>
    <h2>Coincidencias</h2>
    <ol>
      {results.map(word => <li key={word}>{word}</li>)}
    </ol>
  </div>
}

Results.propTypes = {
  results: PropTypes.arrayOf(PropTypes.string)
}

export default Results
