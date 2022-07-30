const mongoose = require("mongoose");

<<<<<<< HEAD
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
=======
const porductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter product name"],
		trim: true,
	},
	description: {
		type: String,
		required: [true, "Please enter product description"],
	},
	price: {
		type: Number,
		required: [true, "Please enter product price"],
		maxLength: [8, "Price cannot exceed 8 character"],
	},
	rating: {
		type: Number,
		default: 0,
	},
	images: [
		{
			public_id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
	],
	category: {
		type: String,
		required: [true, "Please enter product category"],
	},
	stock: {
		type: Number,
		required: [true, "Please enter product stock"],
		maxLength: [4, "Stock cannot exceed 4 characters"],
		default: 1,
	},
	numOfReviews: {
		type: Number,
		default: 0,
	},
	reviews: [
		{
			name: {
				type: String,
				required: true,
			},
			rating: { type: Number, required: true },
			comment: { type: String, required: true },
		},
	],
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("product", porductSchema);
>>>>>>> parent of a225816 (copied)
