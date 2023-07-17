import { useState } from 'react';
import {
	Box,
	Center,
	Heading,
	Image,
	Input,
	Text,
	Stack,
	InputLeftElement,
	InputRightElement,
	InputGroup,
	Button,
	Flex,
	Link
} from '@chakra-ui/react';
import {
	LockIcon,
	EmailIcon,
	ViewIcon,
	ViewOffIcon,
	Icon,
} from '@chakra-ui/icons';
import logo from '../assets/devchallenges.svg';
import {
	FaSquareFacebook,
	FaTwitter,
	FaGoogle,
	FaGithub,
} from 'react-icons/fa6';
import { Link as LoginLink } from "react-router-dom";

const FormComponent = ({ handleClick, show, loginState,onSubmit}) => {
	const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(email, password); // Pass the email and password to the onSubmit function
  };
	return (
		<Box
			w='473.831px'
			 h={  loginState?'544.372px' :'650px'  }
			border='1px'
			borderColor='#BDBDBD'
			borderRadius='24px'
			mt='2rem'
			mb='3rem'
			py='43px'
			px='57px' >
			<Box>
				<Image src={logo} />
			</Box>
			{loginState ? (
				<Heading
				as='h2'
				color='#333'
				fontFamily='heading'
				fontSize='18px'
				fontWeight='600'
				my='1.5rem'>
					Login
					</Heading>
			) : (
				<Box>
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
				</Box>
			)}

			<Box as='form' my='2rem' onSubmit={handleSubmit}>
				<Stack spacing={4}>
					<InputGroup border={1} borderColor='#BDBDBD' borderRadius={8}>
						<InputLeftElement pointerEvents='none'>
							<EmailIcon color='gray.300' />
						</InputLeftElement>
						<Input type='email' placeholder='Email' onChange={handleEmailChange} />
					</InputGroup>

					<InputGroup border={1} borderColor='#BDBDBD' borderRadius={8}>
						<InputLeftElement pointerEvents='none'>
							<LockIcon color='gray.300' />
						</InputLeftElement>
						<Input
							pr='4.5rem'
							type={show ? 'text' : 'password'}
							placeholder='Enter password'
							onChange={handlePasswordChange}
						/>
						<InputRightElement width='4.5rem'>
							<Button
								h='1.75rem'
								size='sm'
								onClick={handleClick}
								color='gray.400'>
								{show ? <ViewOffIcon /> : <ViewIcon />}
							</Button>
						</InputRightElement>
					</InputGroup>
					<Button
						color='#fff'
						borderRadius={8}
						colorScheme='#2F80ED'
						bgColor='#2F80ED'
						fontFamily='body'
						type='submit'
						>
						Start Coding Now
					</Button>
				</Stack>
				<Box my='2rem'>
					<Text
						color='#828282'
						fontFamily='heading'
						fontWeight='400'
						fontSize='0.875rem'
						textAlign={'center'}>
						{' '}
						or continue with these social profile
					</Text>

					<Flex  mt='2rem' justify='center' >
					  
						<Box
							border='1px'
							borderRadius='100%'
							borderColor='#828282'
							p='1rem'
							ml='1rem'>
							<Center>
								<Icon
									as={FaGoogle}
									w='1.125rem'
									h='1.09756rem'
									color='#828282'
								/>
							</Center>
						</Box>
						<Box
							border='1px'
							borderRadius='100%'
							borderColor='#828282'
							p='1rem'
							ml='1rem'>
							<Center>
								<Icon
									as={FaSquareFacebook}
									w='1.125rem'
									h='1.09756rem'
									color='#828282'
								/>
							</Center>
						</Box>
						<Box
							border='1px'
							borderRadius='100%'
							borderColor='#828282'
							p='1rem'
							ml='1rem'>
							<Center>
								<Icon
									as={FaTwitter}
									w='1.125rem'
									h='1.09756rem'
									color='#828282'
								/>
							</Center>
						</Box>
						<Box
							border='1px'
							borderRadius='100%'
							borderColor='#828282'
							p='1rem'
							ml='1rem'>
							<Center>
								<Icon
									as={FaGithub}
									w='1.125rem'
									h='1.09756rem'
									color='#828282'
								/>
							</Center>
						</Box>
						
					</Flex>
				</Box>
				{loginState? <Text
						color='#828282'
						fontFamily='heading'
						fontWeight='400'
						fontSize='0.875rem'
						textAlign={'center'}>
						{' '}
						
						Don't have an account yet ? <Link as={LoginLink} to='/' color='#2D9CDB'>Register</Link>
					</Text> : <Text
						color='#828282'
						fontFamily='heading'
						fontWeight='400'
						fontSize='0.875rem'
						textAlign={'center'}>
						{' '}
						
						Already a member ? <Link as={LoginLink} to='/login' color='#2D9CDB'>Login</Link>
					</Text>
				}
				
			</Box>
		</Box>
	);
};

export default FormComponent;
