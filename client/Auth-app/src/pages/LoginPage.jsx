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
import { LockIcon, EmailIcon } from '@chakra-ui/icons';
import logo from '../assets/devchallenges.svg';
import FormComponent from '../components/Form';
const LoginPage = () => {
    const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);
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
				/>
			</Center>
    </Box>
  )
}

export default LoginPage