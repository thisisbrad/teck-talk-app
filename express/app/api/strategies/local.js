import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/User';

passport.use(new LocalStrategy(async (email, password, done)=>{
	try {
		const user = await User.findOne({email});
		if(!user) return done(null, false);
		const authorized = await user.verifyPassword(passport);
		if(!authorized) return done(null, false);
		return done(null, user); //I think the password may need to be omitted here.
	} catch (e) {
		return done(e);
	}
}));