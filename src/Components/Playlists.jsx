import React from 'react'
import {useStateProvider} from '../Utils/stateProvider'
import axios from 'axios'
import styled from 'styled-components';

function Playlists() {
const [{token,playlists},dispatch] = useStateProvider();

React.useEffect(() => {
    const getPlayListData = async () => {
        try {
            const response = await axios.get('https://api.spotify.com/v1/me/playlists',{
                headers: {
                    'Authorization' : "Bearer " + token,
                    "Content-Type": "application/json"
                }
            })

            
            const {items} = response.data
            const playlists = items.map(playlist => {
                return {
                    name: playlist.name,
                    id: playlist.id,
                }
            })
            dispatch({
                type: 'SET_PLAYLISTS',
                playlists: playlists
            })
        }
        catch(error){
            console.log(error)
        }
        
    }
        getPlayListData();
}, [token,dispatch])


const changeCurrentPlaylist = async (selectedPlaylistId) => {
    dispatch({
        type: 'SET_PLAYLIST_ID',
        selectedPlaylistId: selectedPlaylistId
    })
}


  return (
    <Container>
        <ul>
            {
                playlists.map(playlist => {
                    return <li key={playlist.id} onClick={(id)=>{changeCurrentPlaylist(playlist.id)}}>{playlist.name}</li>
                })
            }
            
        </ul>
    </Container>
  )
}

export default Playlists;


const Container = styled.div`
height: 100%;
overflow:hidden;

ul{
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding:1rem;
    height: 52vh;
    max-height: 100%;
    overflow: auto;

    &::-webkit-scrollbar {
        width: 0.6rem;
        &-thumb{
            background-color: rgba(255, 255, 255, 0.6);
        }
    }

    li{
      display:flex;
      gap: 1rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover{
        color:white;
      }
    }
    `