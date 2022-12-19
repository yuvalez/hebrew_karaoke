import React, {useState} from 'react';
import styled from 'styled-components';
import { MdClear, MdOutlineSearch } from 'react-icons/md';
import SongsTable from './SongsTable';
import * as Constants from './constants';


const MainApp = styled.div`
    height: 100%;
    width: 100%;
`;


const SearchInputWrapper = styled.div`
    height: 30%;
    margin-top: 5%;
    display: flex
`

const SearchInputBoxWarpper = styled.div`
    border: 2px solid black;
    border-radius: 30px;
    width: 30%;
    margin: auto;
    display: inline-flex;

`;

const SearchInputBox = styled.input`
    width: 100%;
    line-height: 2rem;
    padding-left: 1em;
    padding-top: 1em;
    padding-bottom: 1em;
    font-size: 0.7em;
    border: 0;
    outline: none;
    background-color: transparent;
    &::placeholder {
        color:black;
        opacity: 50%;
    }
`;

const IconContainer = styled.span`
    margin: auto;
    display: flex;
`;

const StyledMdClear = styled(MdClear)`
    margin-top: auto;
    padding-right: 0.25em;
    border-right: 1.5px solid black;
    &:hover {
        cursor: pointer;
    }
`;

const StyledMdOutlineSearch = styled(MdOutlineSearch)`
    margin-top: auto;
    padding-right: 1em;
    padding-left: 0.25em;
    &:hover {
        cursor: pointer;
    }
`;

const SearchPage = ({ ...props }) => {
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [searchResult, setSearchResult]  = useState([]);
    
    const getSongList = async () => {
        setIsLoading(true);
        
        const requestOptions = {
            method: 'POST', 
            body: JSON.stringify({ search: searchText }),
            headers: {
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                contentType: 'application/json; charset=utf-8'
            }
        };
        const response = await fetch(`${Constants.BASE_HTTP_ADDR}/v1.0/search_songs`, requestOptions);
        if (!response.ok) {
            console.log("Fuck")
            setIsLoading(false);
            return;
        }
        const jsonText = await response.json();
        setSearchResult(jsonText.mapping);
        setIsLoading(false);
    }

    return (
        <MainApp>
            <SearchInputWrapper>
                <SearchInputBoxWarpper>
                    <SearchInputBox value={searchText} type="text" placeholder="Search.." onChange={v => setSearchText(v.target.value)}/>
                    <IconContainer>
                        <StyledMdClear fill='black' onClick={() => {
                            setSearchText('');
                        }}/>
                        <StyledMdOutlineSearch fill='black' onClick={() => getSongList()}/>
                    </IconContainer>
                </SearchInputBoxWarpper>
            </SearchInputWrapper>
            
            <SongsTable isLoading={isLoading} searchResult={searchResult}/>
            {/* TODO: Add next and previous buttons */}
        </MainApp>
    )
};

export default SearchPage;