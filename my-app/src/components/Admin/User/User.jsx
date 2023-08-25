import React from 'react'
import cursor from '../../../assets/images/cursor.png'
import { Box, Grid } from '@chakra-ui/react'
import Sidebar from '../Sidebar'


const User = () => {
  return (
    <Grid
    minH={'100vh'}
    templateColumns={['3fr','5fr 1fr']}
    css={{cursor:`url(${cursor}), default`}}
    >
        <Box></Box>
        <Sidebar />

    </Grid>
  )
}

export default User