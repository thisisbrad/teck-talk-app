export const authorized = (req, res, next) => {
	if(!req.user) return res.status(401).json({message: "You must be logged in to access this resource"});
	return next();
}

export const anonymous = (req, res, next) => {
	if(req.user) return res.status(403).json({message: "You are not permitted to access this resource"});
	return next();
}

export const USER_ROLE = 0;
export const MOD_ROLE = 1;
export const ADMIN_ROLE = 2;

export const authorizer = role => (req, res, next) => {
	if(!req.user) return res
	.status(401)
	.json({message: "You must be logged in to access this resource"});
	if(req.user.role < role) return res
	.status(401)
	.json({message: "You lack the necessary permissions to access this resource"});
	return next();
}