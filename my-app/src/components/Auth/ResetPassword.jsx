import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const ResetPassword = () => {
    const params = useParams();
    console.log(params.token)

    const [password,setPassword] = useState("")


  return (
    <Container minHeight={'90vh'}py={'16'}>
        <form action="" >
            <Heading 
            children={"Reset Password"}
            my={"16"}
            textTransform={'uppercase'}
            textAlign={['center','left']}
            />
              <VStack spacing={'8'}>
              <Input
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder='Enter New Password'
            type='password'
            focusBorderColor='yellow.500'
            />
             <Button type='submit' w={'full'} colorScheme='yellow'>
                      Reset Password
                    </Button>
              </VStack>
        </form>
    </Container>
  )
}

export default ResetPassword