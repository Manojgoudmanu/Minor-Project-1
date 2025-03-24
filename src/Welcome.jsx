import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Welcome.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import walletImage from './assets/image.jpg'




const Welcome = () => {
  const nav = useNavigate()
  return (
    <div className='container'>
         <div className='containercard'>
            <div className='Imagecard'>
                <img src={walletImage} alt='Wallet' className='WalletImage' />
            </div>
            <h2 className='Title'>Save your money with Expense tracker</h2>
            <p className='Subtitle'>Save Money! The more money works for you the less you have to work for it</p>
            <div>
                <button className='Startbutton' onClick={()=>nav('/login')}>Let's Start</button>
            </div>
        </div> 
        
      
    </div>
  )
}

export default Welcome