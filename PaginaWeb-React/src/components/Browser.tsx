import { useNavigate } from 'react-router-dom'
import lupa from '../assets/lupa.svg'
import { useState } from 'react'
import '../styles/Browser.css'

interface propBrowser {
  closeFunction: any
}
function Browser ({ closeFunction }: propBrowser) {
  const [browse, setbrowse] = useState('')
  const readBrowse = (event: any) => {
    setbrowse(event.target.value)
  }
  const navigate = useNavigate()
  const goToBrowse = () => {
    if (browse !== '') {
      navigate(`/browse/${browse}`)
    }
  }
  const goToBrowseKey = (event: any) => {
    if (event.key === 'Enter') {
      if (browse !== '') {
        navigate(`/browse/${browse}`)
      }
    }
  }
  return (
    <div className='browserContainer'>
      <input type='text' placeholder='Buscar curso' onChange={readBrowse} onKeyUp={goToBrowseKey} />
      <button onClick={goToBrowse}>
        <img src={lupa} alt='' />
      </button>
    </div>
  )
}

export default Browser
