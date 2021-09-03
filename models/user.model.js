var mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
ObjectId.prototype.valueOf = function () {
	return this.toString();
};
var userSchema = new mongoose.Schema({
    id: ObjectId,
    username: String,
    password: String,
    avatar: String,
});

var User = mongoose.model('User',userSchema,'users');

module.exports = User;