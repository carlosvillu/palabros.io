/* eslint @typescript-eslint/no-misused-promises:0 */
import { ReactElement, useState } from 'react'
import { definition } from '../../js/http'
import List from '../List'
import Loading from '../Loading'

import styles from './index.module.css'

interface Props {
  word: string
  points: number
}

function Tag ({ word, points }: Props): ReactElement {
  const [defintionsState, setDefinitionsState] = useState<string[] | undefined>()
  const [loadingState, setLoadingState] = useState<boolean>(false)
  const [showDefState, setShowDefState] = useState(true)

  const handeClick = async (): Promise<void> => {
    if (defintionsState === undefined) {
      setLoadingState(true)
      setDefinitionsState(await definition(word))
      setLoadingState(false)
    }

    setShowDefState(show => !show)
  }

  return <div className={styles.container} onClick={handeClick}>
    <span data-component='Tag' >
      <span>{word}</span>
      <sub className={styles.sub}>{points}</sub>
    </span>
    <div hidden={showDefState}>
      <Loading show={loadingState} />
      {(defintionsState != null) && <List items={defintionsState}>{(def) => <span className={styles.def}>{def as string}</span>}</List>}
    </div>
  </div>
}

export default Tag
