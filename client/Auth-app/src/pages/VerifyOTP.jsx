import { Box, Center, Heading,  Image, Input,   Stack, Text, Button } from '@chakra-ui/react'
import{ useState } from 'react'
import logo from '../assets/devchallenges.svg';
import axios from 'axios';
const VerifyOTP = () => {
    const [otp, setOTP] = useState("");
    
    
    const handleOTPVerification = async (event) => {
      event.preventDefault();
	  const theOTP = Number(otp);
	  console.log(theOTP);
      try {
        const response = await axios.post('/verify', {theOTP},);
  
        if (response.status === 200) {
          console.log('OTP is verified successfully');
          const token = response.data.token;
		  localStorage.setItem('token', token);
          // Handle successful OTP verification, e.g., store the token in localStorage or perform other actions
		  console.log(token);
		 

        }
      } catch (error) {
        console.log(error);
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