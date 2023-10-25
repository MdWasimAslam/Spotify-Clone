import React from 'react'
import styled from 'styled-components'




function Login() {


  const handleClick = () => {
    const ClientId ="8a2c0d12a6764b019fb404e6e032d7b7";
    const redirectUrl = "http://localhost:3000/";
    // Use this for deployment
    // const redirectUrl = "http://spotifyclone.wasimaslam.cloud/";

    const apiUrl ="https://accounts.spotify.com/authorize";
    const scope =['user-read-private',
    'user-read-email',
    'playlist-read-private'
    ,'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-library-read',
    'user-library-modify',
    'user-top-read',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'app-remote-control',
    'streaming',
    'user-read-playback-position',
    'user-read-recently-played',

];
    window.location = `${apiUrl}?client_id=${ClientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`;
  }


  return (
    <Container>
      <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png' alt='Spotify'/>
      <button onClick={handleClick}>Connect Spotify</button>
    </Container>
  )
}

export default Login
const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
width: 100vw;
background-color: #1db954;
gap:5rem;
img{
  height: 20vh;
}
button{
  padding:1rem 5rem;
  border-radius: 5rem;
  border:none;
  background-color: #191414;
  color: #49f585;
  font-size: 1.5rem;
  cursor: pointer;
}

`