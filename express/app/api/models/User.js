import { compare, hash } from "bcrypt";
import { model, Schema } from "mongoose";


const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		require: [true, "A username must be provided"],
	},
	email: {
		type: String,
		unique: true,
		require: [true, "A valid fullsail email must be provided"],
		validate: { 
			validator: v=> !!v && /^[a-zA-Z0-9._%+-]*@([a-zA-Z0-9-]+\.)*fullsail\.edu$/.test(v),
			message: ({value}) => `${value} is not a valid fullsail email.`
		}
	},
	password: {
		type: String,
		require: [true, "A password must be provided"]
	},
	firstName: {
		type: String,
		require: [true, "A first name must be provided"]
	},
	lastName: {
		type: String,
		require: [true, "A last name must be provided"]
	},
	role: {
		type: String,
		enum: {
			values: ["admin", "moderator", "user"],
			message: `{VALUE} is not supported`
		},
		default: "user"
	},
	joinDate: {
		type: Date,
		default: new Date()
	}
}, {
	methods: {
		verifyPassword: async function(password) {
			return await compare(password, this.password);
		}
	}
});

const SALT_ROUNDS = 15; 

/**
 * Hash the password.
 */
UserSchema.pre('save', async function(){
	if(this.isModified('password')){
		const password = await hash(this.password, SALT_ROUNDS);
		this.password = password;
	}
});

const User = model("User", UserSchema);

export default User;