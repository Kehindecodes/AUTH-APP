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

const FormComponent = ({ handleClick, show, loginState }) => {
	return (
		<Box
			w='473.831px'
			// h='650px'
			border='1px'
			borderColor='#BDBDBD'
			borderRadius='24px'
			mt='6rem'
			mb='3rem'
			py='43px'
			px='57px'>
			<Box>
				<Icon as={logo} boxSize='0.15319rem' h='0.14294rem' />
			</Box>
			{loginState ? (
				<Text color='#333' fontFamily='body' fontWeight='400' fontSize='16px'>
					Login
				</Text>
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

			<Box as='form' my='2rem'>
				<Stack spacing={4}>
					<InputGroup border={1} borderColor='#BDBDBD' borderRadius={8}>
						<InputLeftElement pointerEvents='none'>
							<EmailIcon color='gray.300' />
						</InputLeftElement>
						<Input type='email' placeholder='Email' />
					</InputGroup>

					<InputGroup border={1} borderColor='#BDBDBD' borderRadius={8}>
						<InputLeftElement pointerEvents='none'>
							<LockIcon color='gray.300' />
						</InputLeftElement>
						<Input
							pr='4.5rem'
							type={show ? 'text' : 'password'}
							placeholder='Enter password'
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
						bgColor='#2F80ED'
						fontFamily='body'>
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

					<Box display='flex' mt='2rem'>
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
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default FormComponent;
