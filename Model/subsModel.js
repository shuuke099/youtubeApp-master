const mongoose = require('mongoose');
const User = require('./UserModel');
const SubsSchema = new mongoose.Schema(
	{
		userFrom: {
			type: mongoose.Schema.ObjectId,
			required: [true, 'subs must from user'],
			ref: 'User',
		},
		userTo: {
			type: mongoose.Schema.ObjectId,
			required: [true, 'subs mu st to user'],
			ref: 'User',
		},
	},
	{
		toJSON: {virtuals: true},
		toObject: {virtuals: true},
	}
);
 SubsSchema.index({userFrom: 1, userTo: 1}, {unique: true});
 SubsSchema.statics.calcNumOfSubs = async function (userTo) {
	const stats = await this.aggregate([
		{
			$match: {userTo},
		},
		{
			$group: {
				_id: '$userTo',
				nSubs: {$sum: 1},
			},
		},
	]);

	if (stats.length > 0) {
		await User.findByIdAndUpdate(userTo, {
			subscribe: stats[0].nSubs,
		});
	} else {
		await User.findByIdAndUpdate(userTo, {
			subscribe: 0,
		});
	}
};

SubsSchema.post('save', function () {
	// this points to current review
	this.constructor.calcNumOfSubs(this.userTo);
});

const Subscribe = mongoose.model('Subscribe', SubsSchema);

module.exports = Subscribe;
