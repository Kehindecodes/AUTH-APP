import { Box, Center, Heading,  Image, Input,   Stack, Text, Button } from '@chakra-ui/react'
import{ useState } from 'react'
import logo from '../assets/devchallenges.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const VerifyOTP = () => {
    const [otp, setOTP] = useState("");
    const navigate = useNavigate();
    const handleOTPVerification = async (event) => {
		event.preventDefault();
		const theOTP = Number(otp);
		console.log(theOTP);
		try {
		  const response = await axios.post('/verify', { theOTP });
		  
		  if (response.status === 200) {
			console.log('OTP is verified successfully');
			const token = response.data.token;
			localStorage.setItem('token', token);
	  
			// Handle successful OTP verification, e.g., show an alert and redirect to a different page
			alert('OTP is verified successfully!');
			navigate('/profile') ; // Redirect to the profile page
		  }
		} catch (error) {
		  console.log(error);
		  // Handle error if OTP verification fails, e.g., show an error message to the user
		  alert('OTP verification failed. Please try again.');
		}
	  };
	  
  return (
    <Box>
         <Center>
		<Box
			w='473.831px'
			 h={ '544.372px' }
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
			<Heading
				as='h2'
				color='#333'
				fontFamily='heading'
				fontSize='18px'
				fontWeight='600'
				my='1.5rem'>
					OTP Verification
					</Heading>

			<Box as='form' my='2rem' onSubmit={handleOTPVerification}>
				<Stack spacing={4}>
                <Input type='number' placeholder='Enter OTP' value={otp} onChange={(e) => setOTP(e.target.value)} border={1} borderColor='#BDBDBD' borderRadius={8} />
		
					<Button
						color='#fff'
						borderRadius={8}
						colorScheme='#2F80ED'
						bgColor='#2F80ED'
						fontFamily='body'
						type='submit'
						>
						Verify
					</Button>
				</Stack>
				
			</Box>
		</Box>
        </Center>
    </Box>
  )
}

export default VerifyOTP