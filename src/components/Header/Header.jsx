import React from 'react'
import './Header.css'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'

export default function Header() {
  const styles = {
    fontSize: '25px',
    head: {
      fontWeight: '700',
    margin:"0",

    },
  }
  return (
    <div className="app-head">
      <div className="nav">
        <h3 style={styles.head}>USERS LIST</h3>
        <div>
          <PeopleAltIcon style={styles} />
        </div>
      </div>
    </div>
  )
}
