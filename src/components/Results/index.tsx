import { ReactElement } from 'react'
import PropTypes from 'prop-types'
import Tag from '../Tag'

import styles from './index.module.css'

interface Props {
  results: string[]
}

function Results ({ results = [] }: Props): ReactElement {
  return <div className={styles.container}>
    <h2 className={styles.title}>Coincidencias</h2>
    <ol className={styles.list}>
      {results.map(word => <Tag key={word}>{word}</Tag>)}
    </ol>
  </div>
}

Results.propTypes = {
  results: PropTypes.arrayOf(PropTypes.string)
}

export default Results
