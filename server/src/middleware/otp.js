const twilio = require('twilio');
const nodemailer = require('nodemailer');

// // Twilio configuration
// const twilioAccountSid = 'YOUR_TWILIO_ACCOUNT_SID';
// const twilioAuthToken = 'YOUR_TWILIO_AUTH_TOKEN';
// const twilioPhoneNumber = 'YOUR_TWILIO_PHONE_NUMBER';

// Nodemailer configuration
// Create a transporter using your email service provider configuration
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'olamiposi.oki@gmail.com',
		pass: process.env.EMAIL_PASSWORD,
	},
});

// // Initialize Twilio client
// const twilioClient = twilio(twilioAccountSid, twilioAuthToken);

// Generate a random 6-digit OTP
function generateOTP() {
	return Math.floor(100000 + Math.random() * 900000);
}

// // Send OTP via SMS
// function sendOTPViaSMS(phoneNumber, otp) {
// 	return twilioClient.messages.create({
// 		body: `Your OTP is: ${otp}`,
// 		from: twilioPhoneNumber,
// 		to: phoneNumber,
// 	});
// }

// Send OTP via email
function sendOTPViaEmail(email, otp) {
	const mailOptions = {
		from: 'olamiposi.oki@gmail.com',
		to: email,
		subject: 'OTP Verification',
		text: `Your OTP is: ${otp}`,
	};

	return transporter.sendMail(mailOptions);
}

// Generate OTP
const otp = generateOTP();

// // Send OTP via SMS
// sendOTPViaSMS(phoneNumber, otp)
// 	.then(() => {
// 		console.log('OTP sent via SMS');
// 		// Continue with OTP validation process
// 	})
// 	.catch((error) => {
// 		console.error('Error sending OTP via SMS:', error);
// 		// Handle error
// 	});

function validateOTP(enteredOTP, expectedOTP) {
	return enteredOTP === expectedOTP;
}

module.exports = {
	generateOTP,
	sendOTPViaEmail,
	// sendOTPViaSMS,
	validateOTP,
};
