import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHouse,faChartSimple,faSquarePlus,faBell,faUser  } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import "./Footer.css";


const Footer = () => {
  const nav = useNavigate()
  return (
    <div>
           <section className="footer">
        <div className='button'>
          <FontAwesomeIcon icon={faHouse} onClick={()=>nav("/homepage")} />
        </div>
        <div className='button'>
          <FontAwesomeIcon icon={faChartSimple} onClick={()=>nav("/Statics")} />
        </div>
        <div className='button'>
          <FontAwesomeIcon icon={faSquarePlus} onClick={()=>nav('/addexpense')}/>
        </div>
        <div className='button'>
          <FontAwesomeIcon icon={faBell} onClick={()=>nav('/notifications')} />
        </div>
        <div className='button'>
          <FontAwesomeIcon icon={faUser} onClick={()=>nav('/Profile')}/>
        </div>
      </section>
    </div>
  )
}

export default Footer