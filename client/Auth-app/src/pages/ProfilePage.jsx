import React,{ useEffect, useState } from 'react'
import { Box, Center, Heading,  Image, Input,   Stack, Text, Button } from '@chakra-ui/react'
import axios from '../../axios.config';
const ProfilePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      axios.get('/profile').then((response) => {
        setUser(response.data.user);
        console.log(user)
      });
    }, []);
  return (
    <Box>
        <Heading as={'h2'} color='#333' fontFamily='heading' fontSize='18px' fontWeight='600' my='1.5rem'> welcome to your {user.sub}</Heading>
    </Box>
  )
}

export default ProfilePage