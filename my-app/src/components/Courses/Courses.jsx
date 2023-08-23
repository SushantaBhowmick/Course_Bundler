import React, { useState } from 'react'
import './courses.css'
import {
    Button,
    Container,
    HStack,
    Heading,
    Image,
    Input,
    Stack,
    Text,
    VStack
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Course = ({ views, title, imageSrc, id, addToPlaylistHandler, creator, description, lecture, lectureCount }) => {
    return (
        <VStack className='course' alignItems={['center', 'flex-start']}>
            <Image src={imageSrc} boxSize={'60'} objectFit={'contain'} />
            <Heading
                children={title}
                size={'sm'}
                textAlign={['center', 'left']}
                fontFamily={'sans-serif'}
                maxW={'200px'}
                noOfLines={2}
            />
            <Text noOfLines={2} children={description} />
            <HStack>
                <Text
                    fontWeight={'bold'}
                    textTransform={'uppercase'}
                    children={'Creator'}
                />
                <Text
                    fontFamily={'body'}
                    textTransform={'uppercase'}
                    children={creator}
                />
            </HStack>
            <Heading
                textAlign={'center'}
                size={'xs'}
                children={`Lectures - ${lectureCount}`}
                textTransform={'uppercase'}
            />
            <Heading
                textAlign={'center'}
                size={'xs'}
                children={`Views - ${lectureCount}`}
                textTransform={'uppercase'}
            />
            <Stack direction={['column', 'row']} alignItems={'center'}>
                <Link to={`/course/${id}`}>
                    <Button colorScheme='yellow' >
                        Watch Now
                    </Button>
                </Link>
                <Button colorScheme='yellow' variant={'ghost'} onClick={() => addToPlaylistHandler(id)} >
                    Add To Playlist
                </Button>
            </Stack>

        </VStack>
    )
}

const Courses = () => {
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");

    const categories = [
        "Web Development",
        "Aritificial Intillegence",
        "Data Structure & Algorithm",
        "App Development",
        "Data Science",
        "Game Development",
    ]

const addToPlaylistHandler =()=>{
    alert("Added To Playlist")
}

    return (
        <Container minH={'95vh'} maxW={'container.lg'} paddingY={'8'}>
            <Heading children={"All Courses"} m={'8'} />
            <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search a course...'
                type='text'
                focusBorderColor='yellow.500'
            />
            <HStack overflowX={'auto'} paddingY={'8'} >
                {
                    categories.map((item, index) => (
                        <Button key={index} onClick={() => setCategory(item)} minW={"60"}>
                            <Text children={item} />
                        </Button>
                    ))
                }
            </HStack>
            <Stack
                direction={["column", "row"]}
                flexWrap={'wrap'}
                justifyContent={['flex-start', 'space-evenly']}
                alignItems={['center', 'flex-start']}
            >
                <Course
                    title={"Sapmple"}
                    description={"Sapmple"}
                    views={23}
                    creator={"Sapmple Boy"}
                    imageSrc={"https://cdn.pixabay.com/photo/2017/05/10/19/29/robot-2301646_960_720.jpg"}
                    id={"Sapmple1"}
                    lectureCount={2}
                    addToPlaylistHandler={addToPlaylistHandler}
                />
            </Stack>

        </Container>
    )
}

export default Courses