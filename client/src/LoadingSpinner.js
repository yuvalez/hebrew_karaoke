import React from 'react';
import styled, {keyframes} from 'styled-components';

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Spinner = styled.div`
    border: 16px solid #f3f3f3;
    border-top: 16px solid blue;
    border-radius: 50%;
    animation: ${rotate} 2s linear infinite;
    width: 3rem;
    height: 3rem;
    margin: 4rem auto;
`;

const LoadingSpinner = () => {

    return (
        <Spinner />
    )
}

export default LoadingSpinner;