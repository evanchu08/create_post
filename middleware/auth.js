const passport = require('passport');

const auth = (req, res, next) => {
	if (!passport.authenticate('jwt', {session: false})){
		return res.status(400).json({error: 'You must log in'})
	}
	next();
}

module.exports = { auth }

