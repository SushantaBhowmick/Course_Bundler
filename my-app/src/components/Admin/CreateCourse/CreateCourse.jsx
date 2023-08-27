import { Box, Button, Container, Grid, Heading, Image, Input, Select, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import cursor from '../../../assets/images/cursor.png'
import { fileUploadCss } from '../../Auth/Register'


const CreateCourse = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");

  
  const categories = [
    "Web Development",
    "Aritificial Intillegence",
    "Data Structure & Algorithm",
    "App Development",
    "Data Science",
    "Game Development",
]
const changeImageHandler=(e)=>{
  const file = e.target.files[0];
  const reader = new FileReader();
  
  reader.readAsDataURL(file)
  reader.onload=()=>{
      setImagePrev(reader.result)
      setImage(file)
  }
}
  return (
    <Grid
      minH={'100vh'}
      templateColumns={['3fr', '5fr 1fr']}
      css={{ cursor: `url(${cursor}), default` }}
    >
      <Container py={'16'}>
        <form action="">
          <Heading
            textTransform={'uppercase'}
            children='Create Course'
            my={'16'}
            textAlign={['center', 'left']}
          />
          <VStack m={'auto'} spacing={'8'}>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Title'
              type='text'
              focusBorderColor='purple.300'
            />
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Description'
              type='text'
              focusBorderColor='purple.300'
            />
            <Input
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              placeholder='Creator Name'
              type='text'
              focusBorderColor='purple.300'
            />
            <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            focusBorderColor='purple.300'
            >
              <option value="">Select Category</option>
              {
                categories.map(item=>(
                  <option key={item} value={item}>{item}</option>
                ))
              }

            </Select>
            <Input 
            accept='image/*'
            required
            type="file"
            focusBorderColor='purple.300'
            css={{
              '&::file-selector-button': {
              ...fileUploadCss,
              color:'purple'
              }
            }}
            onChange={changeImageHandler}
            />
            {
              imagePrev && (
                <Image src={imagePrev} boxSize={'64'} objectFit={'contain'} />
              )
            }
            <Button w={'full'} colorScheme='purple' type='submit'>
              Create
            </Button>
          </VStack>
        </form>

      </Container>
      <Sidebar />

    </Grid>
  )
}

export default CreateCourse