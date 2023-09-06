import React from 'react'
import cursor from '../../../assets/images/cursor.png'
import { 
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr, 
} from '@chakra-ui/react'
import Sidebar from '../Sidebar'
import { RiDeleteBin7Fill } from 'react-icons/ri'

const User = () => {
  
const users =[{
  _id: "alsbdnfkijahsdfo",
  name:"Sushanta",
  email: "admin@gmail.com",
  role:"admin",
  subscription:{
    status:'active'
  }
  }]
  
  const updateHandler=(userId)=>{
    alert(userId)
  }
  const deleteHandler=(userId)=>{
    alert(userId)
  }
  
  return (
    <Grid
    minH={'100vh'}
    templateColumns={['3fr','5fr 1fr']}
    css={{cursor:`url(${cursor}), default`}}
    >
        <Box
        p={["0",'16']}
        overflowX={'auto'}
        >
           <Heading
            textTransform={'uppercase'}
            children='All Users'
            my={'16'}
            textAlign={['center', 'left']}
          />
          <TableContainer
          w={['100vw','full']}
          >
            <Table variant={'simple'} size={'lg'}>
              <TableCaption>All available user in the Database</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th>Subscription</Th>
                  <Th isNumeric>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
            {
              users.map(item=>(
                <Row 
                key={item._id} 
                item={item} 
                updateHandler={updateHandler} 
                deleteHandler={deleteHandler}
                />
              ))
            }
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Sidebar />

    </Grid>
  )
}

export default User

function Row({item,updateHandler,deleteHandler}){
  return(
    <Tr>
          <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>{item.subscription.status==='active'?'Active':'Not Active'}</Td>
      <Td isNumeric>
          <HStack justifyContent={'flex-end'}>
            <Button 
            variant={'outline'} 
            color={'purple.500'} 
            onClick={()=>updateHandler(item._id)}
            >Change Role</Button>
            <Button 
            color={'purple.600'}
            onClick={()=>deleteHandler(item._id)}
            ><RiDeleteBin7Fill /></Button>

          </HStack>
      </Td>
       
    </Tr>
  )
}