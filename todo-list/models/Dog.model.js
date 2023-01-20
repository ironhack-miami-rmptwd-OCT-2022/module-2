const { Schema, model } = require("mongoose");

const dogSchema = new Schema(
	{
		name: String,
		breed: String,
		color: String,
		age: Number,
		male: Boolean,
		female: Boolean,
		owner: {
			firstName: String,
			lastName: String,
		},
		siblings: {
			type: [{ type: Schema.Types.ObjectId, ref: "Dog" }],
		},
		price: String,
		available: Boolean,
		onHold: Boolean,
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

const Dog = model("Dog", dogSchema);

module.exports = Dog;
