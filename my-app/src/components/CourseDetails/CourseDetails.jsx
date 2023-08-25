import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import introVideo from "../../assets/videos/intro.mp4"


const CourseDetails = () => {

    const [lectureNumber, setLectureNumber] = useState(0)


    const lecture = [
        {
        _id:"aohfdhf1",
        title:"sample1",
        description:"sample description",
        video:{
            url:'sdohoa'
        }
    },
        {
        _id:"aohfdhf2",
        title:"sample2",
        description:"sample description",
        video:{
            url:'sdohoa'
        }
    },
        {
        _id:"aohfdhf3",
        title:"sample3",
        description:"sample description",
        video:{
            url:'sdohoa'
        }
    },
]

  return (
    <Grid minH={'90vh'} templateColumns={['1fr','3fr 1fr']}>
        <Box>
        <video
                width={"100%"}
                autoPlay
                controls
                controlsList='nodownload noremoteplaback'
                disablePictureInPicture
                disableRemotePlayback
                src={introVideo}
                >
                </video>
                <Heading children={`#${lectureNumber+1} ${lecture[lectureNumber].title}`} m='4' />
                <Heading children='Description' m='4' />
                <Text m='4' children={lecture[lectureNumber].description}/>
        </Box>
        <VStack>f
            {
                lecture.map((item,index)=>(
                    <button 
                    onClick={()=>setLectureNumber(index)}
                    key={item._id} 
                    style={{
                    width:"100%",
                    padding:"1rem",
                    textAlign:'center',
                    margin:0,
                    borderBottom:'1px solid rgba(0,0,0,0.2)'
                }}
                    >
                        <Text noOfLines={1}>
                        #{index+1}{item.title}
                        </Text>
                    </button>
                ))
            }
        </VStack>
    </Grid>
  )
}

export default CourseDetails