import React from 'react'
import { Text, Grid, Button, Image } from "../elements";

const type_data = {
    img:'https://firebasestorage.googleapis.com/v0/b/image-community-3fdad.appspot.com/o/images%2Fborder.jpg?alt=media&token=c6e468bc-8cb8-466f-aa13-2ba8c3c910bb',
    type: 'ENTP',
    content:'외향적이면서 자기만의 영역이 필요하고 호불호가 확고한 고집쟁이',
    dog:'프렌치 불독'
}
const tmp = () => {
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

export default tmp
