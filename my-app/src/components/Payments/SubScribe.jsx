import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { server } from '../../redux/store';
import { buySubcription } from '../../redux/actions/userAction';
import { toast } from 'react-hot-toast';
import logo from '../../assets/images/logo.png';

const SubScribe = ({user}) => {
    const dispatch = useDispatch();
    const {loading,error,subcriptionId} = useSelector(state=>state.subcription);

    const [key,setKey]=useState('');

    const subscribeHandler=async()=> {
        const {data}=await axios.get(`${server}/razorpaykey`);
        setKey(data.key)
        dispatch(buySubcription())
    }
    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch({type:"clearError"});
        }
        // if(message){
        //     toast.success(message);
        //     dispatch({type:"clearError"});
        // }
        if(subcriptionId){
            const openPopUp = ()=>{

                const options={
                    key,
                    name:"CourseBundler",
                    description:"Get accesss to all premium content",
                    image:logo,
                    subcription_id:subcriptionId,
                    callback_url:`${server}/paymentverification`,
                    prefill:{
                        name:user.name,
                        email:user.email,
                        contact:"",

                    },
                    notes:{
                        address:"Sushanta Bhowmick a Full Stack MERN developer",
                    },
                    theme:{
                        color:'#FFC800'
                    }
                }
            const razor = window.Razorpay(options)
            razor.open();

            }
            openPopUp();
        }
    },[dispatch,error,key,subcriptionId,user.name,user.email])
    return (
        <Container h='90vh' p='16'>
            <Heading children='Welcome' my={'8'} textAlign={'center'} />
            <VStack
                boxShadow={'lg'}
                alignItems={'stretch'}
                borderRadius={'lg'}
                spacing={'0'}
            >
                <Box bg={'yellow.400'} p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
                    <Text children={`Pro Pack - ₹299.`} color={'black'} />
                </Box>
                <Box p={'4'}>
                    <VStack textAlign='center' px={'8'} mt={'4'} spacing={"8"} >
                        <Text children={`Join pro pack and get access to all content.`}  />
                        <Heading size={'md'} children='₹299 Only' />
                    </VStack>
                    <Button 
                    onClick={subscribeHandler} 
                    isLoading={loading}
                    my={'8'} w={'full'} colorScheme='yellow'>
                        Buy Now
                    </Button>
                </Box>

                <Box bg={'blackAlpha.600'} p={'4'} css={{borderRadius:'0 0 8px 8px'}} >
                <Heading 
                color={'white'} 
                textTransform={'uppercase'}
                size={'sm'} 
                children={'100% refund at canellation'} />
<Text fontSize={'xs'} color={'white'} children='*Terms & Condition Apply'/>
</Box>
            </VStack>
        </Container>
    )
}

export default SubScribe