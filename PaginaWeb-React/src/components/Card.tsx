import React from 'react'
import Tag from './Tag'
import { enumCategoriaCurso } from '../enum'
import ItemMenu from './ItemMenu'
import imgDemo from '../assets/robotAzul.png'
import '../styles/Card.css'

interface propCard {
  img: string
  alt: string
  title: string
  text: string
  tags: string[]
}

function Card ({ img, alt, title, text, tags }: propCard) {
  if(img===""){
    img=imgDemo
  }
  return (
    <div className='card'>
      <img src={img} alt={alt} />
      <div className='cardContainerInfo'>
        <p className='cardtitle'>{title}</p>
        <div className='cardTagContainer'>
          {tags.map(tag => {
            return <Tag key={tag+title?.replace(' ','')} type={tag} />
          })}
        </div>
        <p className='cardText'>{text}</p>
        <ItemMenu
          text='Más información'
          background
          style={3}
        />
      </div>
    </div>
  )
}
export default Card
