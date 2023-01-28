const { Schema, model } = require("mongoose");

const petStoreSchema = new Schema(
	{
		owner: {
			type: {
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		},
		dogsForSale: {
			type: [{ type: Schema.Types.ObjectId, ref: "Dog" }],
		},
		location: {
			streetAddress: String,
			city: String,
			state: String,
			zip: Number,
		},
		name: String,
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

const PetStore = model("PetStore", petStoreSchema);

module.exports = PetStore;
