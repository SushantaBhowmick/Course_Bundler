import {
    Box,
    Button,
    Grid,
     Heading,
     Modal, 
     ModalBody, 
     ModalCloseButton, 
     ModalContent, 
     ModalHeader, 
     ModalOverlay, 
     Stack,
     Text
    } from '@chakra-ui/react'
import React from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'

const CourseModal = ({isOpen,
    onClose,
    id,
    deleteLectureHandler,
    addLectureHandler,
    courseTitle,
    lectures=[]}) => {

    // const handleClose = () => {
    //     // setTitle('');
    //     // setDescription('');
    //     // setVideo('');
    //     // setVideoPrev('');
    //     onClose();
    // }

  return (
   <Modal isOpen={isOpen} size={'full'} onClose={onClose}>
    <ModalOverlay/>
    <ModalContent >
        <ModalHeader>{courseTitle}</ModalHeader>
        <ModalCloseButton  />
        <ModalBody p='6'>
            <Grid templateColumns={["1fr","3fr 1fr"]}>
                <Box px={['0','16']} >
                    <Box my={'5'}>
                        <Heading children={courseTitle}/>
                        <Heading children={`#${id}`} size={'sm'} opacity={'0.4'}/> 
                    </Box>
                        <Heading children={`Lectures`} size={'lg'} /> 

                        <VideoCard 
                        title="ReactIntro"
                        description="This is a intro lecture, where you will know the basic of react"
                        num={1}
                        lecturesId="shlecturesjsdf"
                        courseId={id}
                        deleteHandler={deleteLectureHandler}
                        />
                </Box>
            </Grid>
        </ModalBody>
    </ModalContent>
    
   </Modal>
  )
}

export default CourseModal

function VideoCard({title,description,num,lecturesId,courseId,deleteLectureHandler}){
    return <Stack 
    direction={['column','row']} 
    my={'8'} borderRadius={'lg'} 
    boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
    justifyContent={['flex-start','space-between']}
    p={['4','8']}
    >
        <Box>
            <Heading size={'sm'} children={`#${num} ${title}`}/>
            <Text children={'Description'} />
        </Box>
        <Button color={'purple.600'} onClick={()=>deleteLectureHandler(courseId,lecturesId)}>
            <RiDeleteBin7Fill />
        </Button>

    </Stack>
}