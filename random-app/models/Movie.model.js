const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const movieSchema = new Schema(
	{
		title: String,
		actors: {
			type: Schema.Types.ObjectId,
			ref: "Actor",
		},
		genre: {
			type: String,
			enum: ["Horror", "Action", "Drama", "Comedy", "Fantasy"],
		},
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

const Movie = model("Movie", movieSchema);

module.exports = Movie;
