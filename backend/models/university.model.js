const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the University schema
const universitySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
    },
  },
  contactInformation: {
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
  },
  establishedYear: {
    type: Number,
    required: true,
  },
  institutes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Institute', // Reference to Institute schema
    },
  ],
  accreditation: {
    type: String, // Accreditation info (e.g., UGC, NAAC, etc.)
  },
  logoUrl: {
    type: String, // URL for the university logo
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware for automatic timestamping
universitySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the model
module.exports = mongoose.model('University', universitySchema);
