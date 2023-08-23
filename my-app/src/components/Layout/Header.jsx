import React from 'react'
import {ColorModeSwitcher} from '../../ColorModeSwitcher'
import { 
    Button, 
    ButtonGroup, 
    Drawer, 
    DrawerBody,
    DrawerContent, 
    DrawerHeader, 
    DrawerOverlay, 
    HStack, 
    VStack, 
    useDisclosure 
} from '@chakra-ui/react'
import {RiDashboardFill, RiLoginBoxLine, RiLogoutBoxLine, RiMenu5Fill, RiProfileLine} from 'react-icons/ri'
import { Link } from 'react-router-dom'

const Header = () => {
    const isAuthenticated = true;

    const {isOpen,onOpen,onClose}  = useDisclosure()

    const LinkButton = ({url="/",title="Home"})=>(
        <Link to={url}>
        <Button variant={'ghost'}>{title}</Button>
    </Link>
    )

const user = {
    role:"admin",
}

const logoutHandler =()=>{
    console.log('logout')
}
  return (
   <>
   <ColorModeSwitcher />
   <Button onClick={onOpen}
   colorScheme='yellow'
   width={"12"}
   height={"12"}
   rounded={"full"}
   position={'fixed'}
   left={'6'}
   top={'6'}
   >
    <RiMenu5Fill />
   </Button>

   <Drawer
   placement='left'
   onClose={onClose}
   isOpen={isOpen}
   >
    <DrawerOverlay backdropFilter={'blur(5px)'} />
    <DrawerContent>
        <DrawerHeader borderBottomWidth={"1px"} children={'COURSE BUNDLER'} />
        <DrawerBody >
            <VStack spacing={'4'} alignItems={'flex-start'}>
                <LinkButton url={'/'} title='Home'/>
                <LinkButton url={'/courses'} title='Browse All Courses'/>
                <LinkButton url={'/request'} title='Request a Course'/>
                <LinkButton url={'/contact'} title='Contact Us'/>
                <LinkButton url={'/about'} title='About'/>

                <HStack 
                justifyContent={'space-evenly'}
                position={'absolute'}
                bottom={'2rem'}
                width={"80%"}
                >
                    {isAuthenticated?(
                    <>
                    <VStack>
                        <HStack>
                        <Link to={'/profile'}>
                        <Button colorScheme='yellow' variant={'ghost'}>
                            <RiProfileLine />
                            Profile
                            </Button>
                        </Link>
                        <Button variant={'ghost'} onClick={logoutHandler}> 
                            <RiLogoutBoxLine />
                            Logout
                            </Button>
                        </HStack>
                        {user && user.role==='admin' ? 
                        <Link to='/admin/dashboard'>
                            <Button
                              width={"full"} 
                              colorScheme='purple'
                              variant={'ghost'}
                              >
                                <RiDashboardFill style={{margin:"4px"}}/>
                                Dashboard
                                </Button>
                        </Link>
                    :""}
                    </VStack>
                    </>)
                    :(<>
                        <Link to={'/login'}>
                        <Button colorScheme='yellow'>
                            <RiLoginBoxLine />
                            Login
                            </Button>
                        </Link>
                        <p>OR</p>
                        <Link to={'/signup'}>
                        <ButtonGroup colorScheme='yellow'>
                            Signup
                            </ButtonGroup>
                        </Link>
                    </>)}
                </HStack>
            </VStack>
        </DrawerBody>
    </DrawerContent>
   </Drawer>
   </>
  )
}

export default Header;

