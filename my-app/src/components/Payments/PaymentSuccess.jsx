import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiCheckboxFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const PaymentSuccess = () => {
  return (
    <Container h='90vh' p={'16'}>
        <Heading my={'8'} textAlign={'center'}>
            You Have Pro Pack
        </Heading>
        <VStack boxShadow={'lg'}
        pb={'16'}
        alignItems={'center'}
        borderRadius={'lg'}
        >
            <Box w='full' bg={'yellow.400'} p='4' css={{borderRadius:"8px 8px 0 0"}}>
    <Text color='black'>Payment Success</Text>
            </Box>
            <Box p='4'>
                <VStack textAlign={'center'} px='8' mt={'8'} spacing={'8'}> 
                    <Text children="Congratulation you're a pro member. You have access to premium content " />
                   <Heading size={'4xl'}>
                   <RiCheckboxFill />
                   </Heading>
                </VStack>
            </Box>
            <Link to='/profile'>
                <Button variant={'ghost'} colorScheme='yellow'>
                    Go to profile
                </Button>
            </Link>
            <Heading size={'xs'} children={'Reference: kuchbhidedo,ok'} />
        </VStack>

    </Container>
  )
}

export default PaymentSuccess