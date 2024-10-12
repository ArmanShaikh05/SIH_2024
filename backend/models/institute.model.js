const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Institute schema
const instituteSchema = new Schema({
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
  departments: [
    {
      name: {
        type: String,
        required: true,
      },
      hod: {
        type: String, // Head of Department name
      },
      contactEmail: {
        type: String,
      },
    },
  ],
  alumni: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Alumni', // Reference to the Alumni schema
    },
  ],
  eventsOrganized: [
    {
      eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event', // Reference to the Event schema
      },
      eventName: {
        type: String,
      },
      eventDate: {
        type: Date,
      },
    },
  ],
  establishedYear: {
    type: Number,
  },
  instituteRanking: {
    type: Number, // Ranking of the institute
  },
  logoUrl: {
    type: String, // URL to the institute's logo
  },
  description: {
    type: String, // Brief description of the institute
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
instituteSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the model
module.exports = mongoose.model('Institute', instituteSchema);
