import { useState } from 'react';
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

const RegisterPage = () => {
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
				<Box
					w='473.831px'
					h='550px'
					border='1px'
					borderColor='#BDBDBD'
					borderRadius='24px'
					py='43px'
					px='57px'>
					<Box>
						<Icon as={logo} boxSize='0.15319rem' h='0.14294rem' />
					</Box>

					<Heading
						as='h2'
						color='#333'
						fontFamily='heading'
						fontSize='18px'
						fontWeight='600'
						my='1.5rem'>
						Join thousands of learners from <br /> around the world
					</Heading>
					<Text color='#333' fontFamily='body' fontWeight='400' fontSize='16px'>
						Master web development by making real-life projects. There are
						multiple paths for you to choose
					</Text>
					<Box as='form' my='2rem'>
						<Stack spacing={4}>
							<InputGroup>
								<InputLeftElement pointerEvents='none'>
									<EmailIcon color='gray.300' />
								</InputLeftElement>
								<Input type='email' placeholder='Email' />
							</InputGroup>

							<InputGroup>
								<InputLeftElement pointerEvents='none'>
									<LockIcon color='gray.300' />
								</InputLeftElement>
								<Input
									pr='4.5rem'
									type={show ? 'text' : 'password'}
									placeholder='Enter password'
								/>
								<InputRightElement width='4.5rem'>
									<Button h='1.75rem' size='sm' onClick={handleClick}>
										{show ? 'Hide' : 'Show'}
									</Button>
								</InputRightElement>
							</InputGroup>
							<Button>Start Coding Now</Button>
						</Stack>
					</Box>
				</Box>
			</Center>
		</Box>
	);
};

export default RegisterPage;
