import { styled } from '@mui/material/styles';
import React from 'react'

const App = styled('div')(() => ({
    width: '70%',
    height: '80vh',
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: '-35%',
    marginTop: '-40vh',
    padding: 25
}))

const BaseWrapper = ({
    children
}) => {
    return(
        <App>
            { children }
        </App>
    )
}

export default BaseWrapper