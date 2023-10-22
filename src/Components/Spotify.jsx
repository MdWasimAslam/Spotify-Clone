import React, { useEffect,useRef,useState } from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer';
import {useStateProvider} from '../Utils/stateProvider'
import axios from 'axios';


function Spotify() {
    const [{token},dispatch] = useStateProvider();

    const bodyRef = useRef();
    const [navBackground, setnavBackground] = useState(false);
    const [headerBackground, setheaderBackground] = useState(false);


    const bodyScrolled = () => {
        bodyRef.current.scrollTop >=30
        ? setnavBackground(true)
        : setnavBackground(false)
        bodyRef.current.scrollTop >= 268
        ? setheaderBackground(true)
        : setheaderBackground(false)
    }

    useEffect(() => {
        const getUserInfo = async () => {
            const data = await axios.get('https://api.spotify.com/v1/me',{
                headers: {
                    'Authorization' : "Bearer " + token,
                    "Content-Type": "application/json"
                }
        })
        const userInfo = {
            userId: data?.data?.id,
            userName: data?.data?.display_name,
         };
         dispatch({
                type: 'SET_USER',
                userInfo: userInfo
         })
        }
         getUserInfo();
    }, [token,dispatch])


  return (
    <Container>
        <div className="spotify_Body">
            <Sidebar />
            <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
                <Navbar navBackground={navBackground} />
                <div className="body_contents">
                    <Body headerBackground={headerBackground}/>
                </div>
            </div>
        </div>


        <div className="spotify_footer">
            <Footer />
        </div>
    </Container>
  )
}

export default Spotify;

const Container = styled.div`
max-width: 100vw;
max-height: 100vh;
overflow: hidden;
display:grid;
grid-template-rows: 90vh 10vh;
.spotify_Body{
    display:grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0,0,0,1));
    background-color: rgb(32,87,100);

    .body{
    height: 100%;
    width: 100%;
    overflow:auto;
    &::-webkit-scrollbar {
        width: 0.6rem;
        &-thumb{
            background-color: rgba(255, 255, 255, 0.6);
        }
    }
    }
}
`;