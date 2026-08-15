const { clerkMiddleware, requireAuth } = require('@clerk/express');

// The Clerk middleware automatically verifies the session token in the Authorization header
// and attaches the user's information to req.auth
const requireClerkAuth = requireAuth({
  signInUrl: undefined // We only return 401 for an API
});

// We can create an error handling wrapper for Clerk's 401s if needed, 
// or let the global error handler catch it. Let's explicitly check req.auth for safety.
const ensureAuthenticated = (req, res, next) => {
  if (!req.auth || !req.auth.userId) {
    return res.status(401).json({
      success: false,
      message: 'Unauthenticated: Invalid or missing Clerk token.'
    });
  }
  next();
};

module.exports = {
  clerkMiddleware,
  requireClerkAuth,
  ensureAuthenticated
};
