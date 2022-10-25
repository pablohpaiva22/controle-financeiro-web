import React from 'react'
import styles from './Home.module.scss'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className={styles.container}>
      <h1>HOME</h1>

      <div className={styles.links}>
        <Link to='login'>Login</Link>
        <Link to='cadastrar'>SignUp</Link>
      </div>
    </div>
  )
}

export default Home
