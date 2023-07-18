import {useState} from 'react'
import {
	Box,
	Center,
	Heading,
	Icon,
	Image,
	Input,
	Text,
	Stack,
	InputLeftElement,
	InputRightElement,
	InputGroup,
	Button,
} from '@chakra-ui/react';
import axios from 'axios';
import { LockIcon, EmailIcon } from '@chakra-ui/icons';
import logo from '../assets/devchallenges.svg';
import FormComponent from '../components/Form';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
	const [show, setShow] = useState(false);
	const navigate = useNavigate();
	const handleClick = () => setShow(!show);
	const handleSubmit = async (email,password) => {
	
		try {
		  const response = await axios.post('http://127.0.0.1:8080/auth/login', { email, password });
	
		  if (response.status === 200) {
			console.log('User is logged in successfully');
	
			if (response.data.redirectTo) {
			  navigate(response.data.redirectTo); // Redirect to the specified page
			} else {
			  // Handle successful login without redirectTo property
			}
		  }
		} catch (error) {
			console.error(error);

		  
		}
	  };
  return (
    <Box
        bg='#fff'
			height='100vh'
			width='100%'
			display='flex'
			justifyContent='center'
			alignItems='center'>
			<Center>
				<FormComponent
					handleClick={handleClick}
					show={show}
					loginState={true}
					onSubmit={handleSubmit}
				/>
			</Center>
    </Box>
  )
}

export default LoginPage