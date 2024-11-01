import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/User.js';

passport.use(new LocalStrategy(async (username, password, done)=>{
	try {
		const user = await User.findOne({_username:username.toLowerCase()});
		if(!user) return done(null, false);
		const authorized = await user.verifyPassword(password);
		console.log(authorized);
		if(!authorized) return done(null, false);
		
		return done(null, user); //I think the password may need to be omitted here.
	} catch (e) {
		return done(e);
	}
}));

passport.serializeUser(({id, username, firstName, lastName, role}, cb)=>process.nextTick(()=>{
	cb(null, {id, username, firstName, lastName, role})
}));

passport.deserializeUser(async ({id}, cb)=>{
	const user = await User.findById(id, 'username firstName lastName role');
	cb(null, user)
});