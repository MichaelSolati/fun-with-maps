Meteor.publish("restaurants", function () {
	return Restaurants.find({});
})
