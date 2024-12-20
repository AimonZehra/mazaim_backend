const jwt = require('jsonwebtoken');

// Secret key for signing JWTs (should be stored in an environment variable for production)

/**
 * Generates a JWT token
 */
function generateToken(user) {
  const payload = {
    id: user.id, // Ensure the correct property name for the user ID
    email: user.email
  };

  console.log('Payload before signing:', payload); // Add this line to debug

  const options = {
    expiresIn: '5h', // 1 hour validity
    algorithm: 'HS256'
  };

  return jwt.sign(payload, process.env.NODE_SECRET_KEY, options);
}

/**
 * Verifies the token and returns the decoded payload
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.NODE_SECRET_KEY);
  } catch (error) {
    console.log('Token verification failed:', error);
    return null;
  }
}

module.exports = { generateToken, verifyToken };
