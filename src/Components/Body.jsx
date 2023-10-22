import React from 'react'
import styled from 'styled-components'
import { AiFillClockCircle } from 'react-icons/ai'
import { useStateProvider } from '../Utils/stateProvider';
import axios from 'axios';

function Body({headerBackground}) {

  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] = useStateProvider();

  React.useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId?selectedPlaylistId:"37i9dQZF1DXbVhgADFy3im"}`, {
        headers: {
          'Authorization': "Bearer " + token,
          "Content-Type": "application/json"
        }
      })

      const selectedPlaylist = {
        id: response?.data?.id,
        name: response?.data?.name,
        description: response?.data?.description.startsWith("<a") ? "" : response?.data?.description,
        image: response?.data?.images[0]?.url,
        tracks: response?.data?.tracks?.items.map((item) => ({
          id: item?.track?.id,
          name: item?.track?.name,
          artist: item?.track?.artists.map((artist) => artist?.name),
          duration: item?.track?.duration_ms,
          image: item?.track?.album?.images[2]?.url,
          uri: item?.track?.uri,
          album: item?.track?.album?.name,
          track_number: item?.track?.track_number

        }))
      };
      dispatch({
        type: "SET_PLAYLIST",
        selectedPlaylist: selectedPlaylist
      })

    }
    getInitialPlaylist();
  }
    , [token, dispatch, selectedPlaylistId])



const msToMinutesAndSeconds = (ms) => {
  let minutes = Math.floor(ms / 60000);
  let seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}


const playTrack = async (id,name,artists,image,context_uri,track_number) => {
  const response = await axios.put(`https://api.spotify.com/v1/me/player/play`, {
    uris: [context_uri],

  }, {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  });
  if(response.status === 204){
    const currentPlaying ={
      id,name,artists,image,context_uri,track_number
    }
    dispatch({
      type: 'SET_PLAYING',
      currentlyPlaying: currentPlaying,
    });
    dispatch(
      {
        type: 'SET_PLAYER_STATE',
        playerState: true
      }
    )
  }else{
    dispatch(
      {
        type: 'SET_PLAYER_STATE',
        playerState: true
      }
    )
  }
}
  return (
    <Container headerBackground={headerBackground}>
      {
        selectedPlaylist && (
          <>

            <div className="playlist">
              <div className="image">
                <img src={selectedPlaylist.image} alt='selectedPlaylist'></img>
              </div>
              <div className="details">
                <span className='type'>PLAYLIST</span>
                <h1 className='title'>{selectedPlaylist.name}</h1>
                <p className='description'>{selectedPlaylist.discription}</p>
              </div>
            </div>
            <div className="list">
              <div className="header_row">
                <div className="col">
                  <span></span>
                </div>
                <div className="col">
                  <span>TITLE</span>
                </div> 
               
               
                <div className="col">
                  <span>ALBUM</span>
                </div> 
                <div className="col">
                  <span><AiFillClockCircle /></span>
                </div>
                <div className="col">
                  <span>#</span>
                </div> 

              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map((track, index) => (
                <div className="row" key={track.id} onClick={()=>{
                  playTrack(track.id,track.name,track.artist,track.image,track.uri,track.track_number)
                }}>

                  <div className="col">
                    <span>{index + 1}</span>
                  </div>
                  <div className="col detail">
                    <div className="image">
                      <img src={track.image} alt="track" />
                    </div>
                    <div className="info">
                      <span className="name">{track.name}</span>
                      <span>{track.artist}</span>
                    </div>
                  </div>
                  <div className="col">
                    <span>{track.album}</span>
                  </div>
                  <div className="col">
                    <span>{msToMinutesAndSeconds(track.duration)}</span>
                  </div>
                </div>
              ))}
            </div>

          </>
        )
      }
    </Container>
  )
}

export default Body

const Container = styled.div`

.playlist{
  margin:0 2rem;
  display:flex;
  align-items: center;
  gap: 2rem;
  
  .image{
    img{
      height: 15rem;
      boxshadow: rgba(0,0,0,0.5) 0px 25px 50px 12px ;

    }
  }
  .details{
    display:flex;
    flex-direction: column;
    gap: 1rem;
    color: #e0dede;
    .title{
      color:white;
      font-size: 4rem;
      
    }
  }

}
.list{
  .header_row{
    display:grid;
    grid-template-columns: 0.3fr 3fr 2fr 0.1fr ;
    color:#dddcdc;
    margin: 1rem 0 0 0;
    position: sticky;
    top:15vh;
    padding:1rem 3rem;
    transition: 0.3s ease-in-out;


  }
  
  }
  .tracks{
    margin:0 2rem;
    display:flex;
    flex-direction: column;
    margin-bottom:5rem;
    cursor: pointer;
    .row{
      padding:0.5rem 1rem;
      display:grid;
      grid-template-columns: 0.3fr 3.1fr 1.9fr 0.1fr ;
      &:hover{
        background-color: rgba(0,0,0,0.7);
      }
      .col{
        display:flex;
        align-items: center;
        color:#dddcdc;
        
          img{
            height: 40px;
          }
      }
      .detail{
        display:flex;
        gap: 1rem;
        .info{
          display:flex;
          flex-direction: column;

        }
      }
    }
}


`