import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators as mbtiActions } from "../redux/modules/mbti";
import { Text, Grid, Button, Image } from "../elements";

const Result = (props) => {
    const dispatch = useDispatch()
    const type = props.match.params.mbti
    console.log(type)
    const type_data = useSelector(state => state.mbti.type_data)
    const isLoading = useSelector(state => state.mbti.isLoading)
    const result = useSelector(state => state.mbti.result)
    console.log('RESULT',result)
    useEffect(()=>{
        dispatch(mbtiActions.totalResult(result))
        // dispatch(mbtiActions.getResultAPI())
    },[])
    console.log('RESULT_LIST',type_data)

    if(isLoading){
        return(
          <>
          <h1>LOADING...</h1>
          </>
        )
      }
    
    return (
        <Grid center column>
        <Grid width="auto" margin='10px 0 0 0'>
            <Text  size='20px' color='rgba(0, 0, 0, 0.3)'>당신에게 어울리는 견종은..?</Text>
            <Text size='30px' bold>{type_data.content}</Text>
            <Text size='25px' bold color='#fea966'> {type_data.type}</Text>
            <img src={type_data.img} alt='dog' style={{width:'auto', height:'auto', maxWidth:'600px', maxHeight:'600px',}}/>
          <Text size='24px' bold>  {type_data.dog}</Text>
        </Grid>
        
      </Grid> 
    )
}

export default Result
