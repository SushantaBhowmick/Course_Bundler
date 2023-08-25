import { 
    Avatar,
    Button,
    Container, 
    HStack, 
    Heading, 
    Image, 
    Input, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    Stack,
    Text,
    VStack,
    useDisclosure
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { fileUploadCss } from '../Auth/Register'

const Profile = () => {

    const user={
        name:"Sushanta Bhowmick",
        email:"bhosushanta922@gmail.com",
        createdAt:new Date().toISOString(),
        role:"user",
        subscription:{
            status:"active"
        },
        playlist:[
            {
                course:'Cashfiash',
                poster:'https://cdn.pixabay.com/photo/2017/05/10/19/29/robot-2301646_960_720.jpg'
            }
        ]

    }
   const changeImageSubmitHandler=(e,image)=>{
    e.preventDefault();
    console.log(image)
   }

    const removeFromPlaylistHandle =(id)=>{
        alert(`Course Deleted Successfully ${id}`)
    }
const {isOpen, onClose,onOpen} =useDisclosure()

  return (
    <Container minH={'95vh'}  maxW='container.lg' py='8'>
        <Heading children='Profile' m='8' textTransform={'uppercase'} />
        <Stack
        justifyContent={'flex-start'}
        direction={['column','row']}
        alignItems={'center'}
        spacing={['8','16']}
        padding='8'
        >
        <VStack>
            <Avatar boxSize={'48'}/>
            <Button onClick={onOpen} colorScheme='yellow' variant={'ghost'}>
                Change Photo
            </Button>
        </VStack>

        <VStack spacing={'4'}
        alignItems={['center','flex-start']}
        >
            <HStack>
                <Text children='Name:' fontWeight={'bold'}/>
                <Text children={user.name} />
            </HStack>
            <HStack>
                <Text children='Email:' fontWeight={'bold'}/>
                <Text children={user.email} />
            </HStack>
            <HStack>
                <Text children='CreatedAt:' fontWeight={'bold'}/>
                <Text children={user.createdAt.split("T")[0]} />
            </HStack>

           {user.role !== "admin" && (
             <HStack>
                <Text children='Subcription:' fontWeight={'bold'} />
                {
                    user.subscription.status==='active'?(
                        <Button color='yellow.500' variant={'unstyled'}>Cancel Subcirption</Button>
                    ):(
                        <Link to='/subscribe'>
                            <Button colorScheme='yellow'>Subscribe</Button>
                        </Link>
                    )
                }
             </HStack>
           )}
           <Stack direction={['column','row']}
        alignItems={'center'}>
            <Link to='/updateprofile'>
                <Button>Update Profile</Button>
            </Link>
            <Link to='/changepassword'>
                <Button>Change Password</Button>
            </Link>

           </Stack>
        </VStack>
        </Stack>

        <Heading children='Playlist' size={'md'}/>
        {
            user.playlist.length>0 && (
                <Stack direction={['column','row']}
                alignItems={'center'}
                padding='4'
                
                >
{
    user.playlist.map((item)=>(
        <VStack w='48' m='2' key={item.course}>
            <Image 
            boxSize={'full'}
            objectFit={'contain'}
            src={item.poster}
            />
            <HStack>
                <Link to={`/course/${item.course}`}>
                    <Button variant={'ghost'} colorScheme='yellow'>Watch Now</Button>
                </Link>
                <Button onClick={()=>removeFromPlaylistHandle(item.course)}>
                    <RiDeleteBin7Fill />
                    Delete Course
                </Button>
            </HStack>
        </VStack>
    ))
}
                </Stack>
            )
        }
        <ChangePhotoBox isOpen={isOpen} onClose={onClose} changeImageSubmitHandler={changeImageSubmitHandler} />
    </Container>
  )
}

export default Profile

function ChangePhotoBox({isOpen,onClose,changeImageSubmitHandler}){
    const [imagePrev,setImagePrev] = useState("")
    const [image,setImage] = useState("")

    const changeImage=(e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.readAsDataURL(file)
        reader.onload=()=>{
            setImagePrev(reader.result)
            setImage(file)
        }
    }
    const closeHandler=()=>{
        onClose();
        setImagePrev('');
        setImage('')
    }

    return (
        <Modal isOpen={isOpen} onClose={closeHandler} >
            <ModalOverlay backdropFilter={'blur(10px'} />
            <ModalContent>
                <ModalHeader children='Change Photo' />
                <ModalCloseButton/>
                <ModalBody>
                    <Container>
                        <form onSubmit={(e)=>changeImageSubmitHandler(e,image)}>
                            <VStack spacing={'8'}>
                                {
                                    imagePrev &&  <Avatar src={imagePrev} boxSize={'48'} />

                                }
                                <Input 
                                type='file'
                                css={{'&::file-selector-button':fileUploadCss}}
                                onChange={changeImage}
                                />
                                <Button w='full' colorScheme='yellow' type='submit'>Change</Button>
                            </VStack>
                        </form>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button mr={'3'} onClick={closeHandler}> 
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}