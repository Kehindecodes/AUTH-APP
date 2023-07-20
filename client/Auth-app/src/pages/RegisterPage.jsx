import { useState } from 'react';
import {
	Box,
	Center,
	
} from '@chakra-ui/react';

import FormComponent from '../components/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const RegisterPage = () => {
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);
	const navigate = useNavigate();
	const handleSubmit = async(email, password) => {
		try {
			const response = await axios.post('/auth/register', { email, password });
			if (response.status === 200) {
				console.log('User is registered successfully');
				if (response.data.redirectTo) {
					navigate(response.data.redirectTo); // Redirect to the specified page
				  } else {
					navigate('/login'); // Redirect to the login page by default
				  }
				
			  } else {
				console.log(response.data.error); // Display the error message
			  }
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Box
			bg='#fff'
			// height=''
			width='100%'
			display='flex'
			justifyContent='center'
			alignItems='center'>
			<Center>
				<FormComponent
					handleClick={handleClick}
					show={show}
					loginState={false}
					onSubmit={handleSubmit}
				/>
			</Center>
		</Box>
	);
};

export default RegisterPage;
