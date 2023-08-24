import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const ForgotPassword = () => {

    const [email,setEmail] = useState("")


  return (
    <Container minHeight={'90vh'}py={'16'}>
        <form action="" >
            <Heading 
            children={"Forgot Password"}
            my={"16"}
            textTransform={'uppercase'}
            textAlign={['center','left']}
            />
              <VStack spacing={'8'}>
              <Input
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='abc@gmail.com'
            type='email'
            focusBorderColor='yellow.500'
            />
             <Button type='submit' w={'full'} colorScheme='yellow'>
                      Send Reset Link
                    </Button>
              </VStack>
        </form>
    </Container>
  )
}

export default ForgotPassword