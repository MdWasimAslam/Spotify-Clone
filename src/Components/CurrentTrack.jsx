import React from 'react'
import styled from 'styled-components'
import { useStateProvider } from '../Utils/stateProvider';
import axios from 'axios';


function CurrentTrack() {
    const [{token,currentlyPlaying},dispatch] = useStateProvider();

React.useEffect(() => {
    const getCurrentTrack = async () => {
        try {
            const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing ',{
                headers: {
                    'Authorization' : "Bearer " + token,
                    "Content-Type": "application/json"
                }
            })

            
            if(response.data !== ""){
                const {item} = response.data;
                const currentlyPlaying ={
                    id: item.id,
                    name: item.name,
                    artist: item.artists.map((artist) => artist.name),
                    image: item.album.images[2].url,


                }
                dispatch({
                    type: "SET_PLAYING",
                    currentlyPlaying: currentlyPlaying,
                })
            }
        }
        catch(error){
            if(error.response.data.error.message == "The access token expired"){
                window.location.href = "/"
            }
        }
        
    }
    getCurrentTrack();
}, [])


  return (
    <Container>

        {
           currentlyPlaying && (
               <div className='track'>
                <div className="track_image">
                    <img src={currentlyPlaying.image} alt='currently=playing'/>
                </div>
                <div className="track__info">
                    <h4>{currentlyPlaying?.name}</h4>
                    <h6>{currentlyPlaying?.artist ? currentlyPlaying.artist.join(", ") : "No artist information available"}</h6>
                </div>
               </div>

            )
        }
    </Container>
  )
}

export default CurrentTrack;

const Container = styled.div`
.track{
    display: flex;
    align-items: center;
    gap: 1rem;

    &__info{
        display: flex;
        flex-direction: column;
        gap: 0.3rem;

        h4{
            color:white;

        }
        h6{
            color:#b3b3b3;
        }
    }
}

`