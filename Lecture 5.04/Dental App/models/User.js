var UserSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    address: String,
    parent: { type: ObjectId, ref: 'User' }
})