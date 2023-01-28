const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const actorSchema = new Schema(
	{
		firstName: String,
		lastName: String,
		age: Number,
		movies: {
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: "Movie",
				},
			],
		},
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

const Actor = model("Actor", actorSchema);

module.exports = Actor;
