import React from 'react'
import styled from 'styled-components'
import {IoLibrary} from 'react-icons/io5'
import {MdHomeFilled,MdSearch} from 'react-icons/md';
import Playlists from './Playlists';




function Sidebar() {
  return (
    <Container>

        <div className="topLinks">
            <div className="logo">
            <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png' alt='Spotify'/>
            </div>
            <ul>
              <li><MdHomeFilled/><span>Home</span></li>
              <li><MdSearch/><span>Search</span></li>
              <li><IoLibrary/><span>Library</span></li>
            </ul>
        </div>
        <Playlists/>

    </Container>
  )
}

export default Sidebar;



const Container = styled.div`
background-color: black;
color:#b3b3b3;
display:flex;
flex-direction: column;
height: 100%;
width: 100%;

.topLinks{
  display:flex;
  flex-direction: column;
  margin-top: 1rem;

  .logo{
    text-align: center;
    margin: 1rem 0;
    img{
      max-inline-size: 80%;
      block-size: auto;
      margin-bottom: 1rem;
    }
  }
  ul{
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding:1rem;

    li{
      display:flex;
      gap: 1rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover{
        color:white;
      }
    }
  }
}
`
