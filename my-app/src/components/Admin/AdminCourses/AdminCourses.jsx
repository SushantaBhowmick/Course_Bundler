import React, { useEffect } from 'react'
import cursor from '../../../assets/images/cursor.png'
import { 
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure, 
} from '@chakra-ui/react'
import Sidebar from '../Sidebar'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import CourseModal from './CourseModal'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses } from '../../../redux/actions/courseAction'



const AdminCourses = () => {
  const {isOpen,onOpen,onClose} = useDisclosure();
  
const courseDetailsHandler=(userId)=>{
  onOpen()
 }
 const deleteHandler=(userId)=>{
   alert(userId)
 }
 const deleteLectureHandler=(courseId,lecturesId)=>{
   alert(courseId,lecturesId)
 }
 const addLectureHandler=(e,courseId,title,description,video)=>{
  //  alert(courseId,lecturesId)
  e.preventDefault()
 }
const  {courses} = useSelector(state=>state.course);

const dispatch = useDispatch();

useEffect(()=>{
  dispatch(getAllCourses())
},[dispatch])
  
  return (
    <Grid
    minH={'100vh'}
    templateColumns={['3fr','5fr 1fr']}
    css={{cursor:`url(${cursor}), default`}}
    >
        <Box
        p={["0",'8']}
        overflowX={'auto'}
        >
           <Heading
            textTransform={'uppercase'}
            children='All Courses'
            my={'16'}
            textAlign={['center', 'left']}
          />
          <TableContainer
          w={['100vw','full']}
          >
            <Table variant={'simple'} size={'lg'}>
              <TableCaption>All available courses in the Database</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Poster</Th>
                  <Th>Title</Th>
                  <Th>Category</Th>
                  <Th>creator</Th>
                  <Th isNumeric>Views</Th>
                  <Th isNumeric>Lectures</Th>
                  <Th isNumeric>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
            {
              courses.map(item=>(
                <Row 
                key={item._id} 
                item={item} 
                courseDetailsHandler={courseDetailsHandler} 
                deleteHandler={deleteHandler}
                />
              ))
            }
              </Tbody>
            </Table>
          </TableContainer>
          <CourseModal 
          isOpen={isOpen} 
          onClose={onClose} 
          deleteLectureHandler={deleteLectureHandler}
          id={"ahsfdha"}
          addLectureHandler = {addLectureHandler}
          courseTitle={"React Course"}
          // lectures
          />
        </Box>
        <Sidebar />

    </Grid>
  )
}

export default AdminCourses

function Row({item,courseDetailsHandler,deleteHandler}){
  return(
    <Tr>
          <Td>#{item._id}</Td>
      <Td><Image src={item.poster.url} /> </Td>
      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>
      <Td isNumeric>
          <HStack justifyContent={'flex-end'}>
            <Button 
            variant={'outline'} 
            color={'purple.500'} 
            onClick={()=>courseDetailsHandler(item._id)}
            >View Lectures</Button>
            <Button 
            color={'purple.600'}
            onClick={()=>deleteHandler(item._id)}
            ><RiDeleteBin7Fill /></Button>

          </HStack>
      </Td>
       
    </Tr>
  )
}