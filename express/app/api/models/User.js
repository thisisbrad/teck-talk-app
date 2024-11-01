import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";


const UserSchema = new Schema({
	_username: {
		type: String,
		unique: true,
	},
	username: {
		type: String,
		unique: true,
		required: [true, "A username must be provided"],
	},
	email: {
		type: String,
		unique: true,
		required: [true, "A valid fullsail email must be provided"],
		validate: { 
			validator: v=> !!v && /^[a-zA-Z0-9._%+-]*@([a-zA-Z0-9-]+\.)*fullsail\.edu$/.test(v),
			message: ({value}) => `${value} is not a valid fullsail email.`
		}
	},
	password: {
		type: String,
		required: [true, "A password must be provided"]
	},
	firstName: {
		type: String,
		required: [true, "A first name must be provided"]
	},
	lastName: {
		type: String,
		required: [true, "A last name must be provided"]
	},
	/*
	With a simplified role system using numbers is better for evaluating permissions later.

	user = 0
	moderator = 1
	admin = 2
	*/
	role: {
		type: Number,
		enum: {
			values: [0, 1, 2],
			message: `{VALUE} is not supported`
		},
		default: 0
	},
	joinDate: {
		type: Date,
		default: new Date()
	}
}, {
	methods: {
		verifyPassword: async function(password) {
			return await bcrypt.compare(password, this.password);
		}
	}
});

const SALT_ROUNDS = 15; 

/**
 * Hash the password.
 */
UserSchema.pre('save', async function(){
	console.log("Presave", this);
	//hash the password
	if(this.isNew || this.isModified('password')){
		const password = await bcrypt.hash(this.password, SALT_ROUNDS);
		this.password = password;
	}

	//lowercase the username for faster lookup
	if(this.isNew || this.isModified('username')){
		console.log("Username was modified")
		this._username = this.username.toLowerCase()
	}
});

const User = model("User", UserSchema);

export default User;