import React, { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import styled from 'styled-components';
import * as Constants from './constants';


const MainPage = styled.div`
    width: 100%;
    height: 100%
`;


const TitleView = styled.div`
    font-size: 1.2em;
    color: rgb(41,41,241);
`
const ArtistView = styled.div`
    margin-top: 1rem;
    font-size: 0.7em;
    color: rgba(127,0,231,0.72);
`

const SongCard = styled.div`
    box-shadow: 5px 5px 30px 7px rgba(0,0,0,0.25), -5px -5px 30px 7px rgba(0,0,0,0.22);
    margin: 1rem auto;
    width: 32.5rem;
    height: 12rem;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: 0.4s;
    &:hover {
        transform: scale(0.9, 0.9);
    }
`;

const SongGrid = styled.div`

    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 70rem;
    margin: 0 auto;
    padding-top: 5rem;
    padding-bottom: 5rem;
`;

const VideoContainer = styled.iframe`
    width: 100%;
    height: 70vh;
    padding: 1rem 0;
    border: 0;
`;

const SongsTable = ({ ...props }) => {
    const { searchResult, isLoading } = props;

    const loadVideo = async (url) => {
        setVideoLoading(true);
        
        const requestOptions = {
            method: 'POST', 
            body: JSON.stringify({ url }),
            headers: {
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                contentType: 'application/json; charset=utf-8'
            }
        };
        const response = await fetch(`${Constants.BASE_HTTP_ADDR}/v1.0/get_karaoke_from_url`, requestOptions);
        if (!response.ok) {
            console.log("Fuck")
            setVideoLoading(false);
            return;
        }
        const jsonText = await response.json();
        setVideoUrl(jsonText.url);
        setVideoLoading(false);
    }

    useEffect(() => {
        setVideoUrl(null);
        setVideoLoading(false);
    }, [isLoading]);

    const [videoLoading, setVideoLoading] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);
    return (
        <MainPage>
        {isLoading || videoLoading ? 
          <LoadingSpinner />
        : 
        (videoUrl ? 
            <VideoContainer src={videoUrl}>
                {videoUrl}
            </VideoContainer>
        :
        <SongGrid>
                {
                searchResult && searchResult.map(result => (
                    <SongCard onClick={() => loadVideo(result.url)}>
                        <TitleView>{result.title}</TitleView>
                        <ArtistView>{result.artist}</ArtistView>
                    </SongCard>
                ))
                }
        </SongGrid>)
        }
        </MainPage>
    )
}

export default SongsTable;