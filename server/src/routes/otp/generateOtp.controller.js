const User = require('../../models/User');
const { generateOTP, sendOTPViaEmail } = require('../../utils/otp');


  async function generateOtpController( req ,res ) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User with this email not found' });
    }

    const otp = generateOTP();

// update the user's otp in the database
    user.otp = {
        "otp": otp,
        "createdAt": new Date().toLocaleString('en-GB', { hour12: false }),
        "expiresAt": new Date(Date.now() + 5 * 60 * 1000).toLocaleString('en-GB', { hour12: false }),
    };

    await user.save();

// send otp to user's address
    sendOTPViaEmail(email, otp);

    return res.status(201).json({ message: 'OTP sent successfully' });
    
}

module.exports = {
  generateOtpController,
}