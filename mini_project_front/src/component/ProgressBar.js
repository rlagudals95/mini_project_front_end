import React from 'react'
import styled from 'styled-components'

const ProgressBar = (props) => {
    const {bgColors, completed, current, maximum} = props
    return (
        <Container>
            <Filler width={completed} bgColors={bgColors} />
                <Label>{`${current} / ${maximum}`}</Label>
        </Container>
    )
}

const Container = styled.div`
    height: 20px;
    width: 300px;
    background: #e0e0de;
    border-radius: 50px;
    margin : 50px;
`

const Filler = styled.div`
    height: 100%;
    width: ${(props) => props.width}% ;
    background: ${props => props.bgColors};
    border-radius: inherit;
    text-align: right;
`

const Label = styled.span`
    padding: 5px;
    color: #000;
    font-weight: bold;
`
export default ProgressBar
