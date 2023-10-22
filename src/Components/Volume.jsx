import React from 'react'
import styled from 'styled-components'
import { useStateProvider } from '../Utils/stateProvider';
import axios from 'axios';

function Volume() {
    const [{token,playerState},dispatch] = useStateProvider();


    const setVolume =async (e) => {
        await axios.put(`https://api.spotify.com/v1/me/player/volume`, {}, {
            params:{
                volume_percent:parseInt( e.target.value)
            },
            headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json',
            },
          });
    }


  return (
    <Container>
        <input type='range' min={0} max={100} class="slider" id="volume-control" onMouseUp={(e=>setVolume(e))} />
    </Container>
  )
}

export default Volume;


const Container = styled.div`
display: flex;
justify-content: flex-end;
align-content: center;

input{
  width: 200px;
  height: 10px;
  -webkit-appearance: none;
  background: transparent;
  outline: none;
  margin: 0;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    background: #fff;
    border: 2px solid #1DB954;
    border-radius: 50%;
    cursor: pointer;
    margin-top: -5px;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    background: #888888;
    border-radius: 5px;
  }


  
}

`