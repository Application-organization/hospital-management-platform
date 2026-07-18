const mongoose = require("mongoose");

const wardSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Ward name is required"],
            unique: true,
            trim: true,
            maxlength: [100, "Ward name cannot exceed 100 characters"]
        },

        description: {
            type: String,
            trim: true,
            maxlength: [500, "Description cannot exceed 500 characters"]
        },

        capacity: {
            type: Number,
            required: [true, "Ward capacity is required"],
            min: [1, "Ward capacity must be at least 1"]
        },

        occupiedBeds: {
            type: Number,
            default: 0,
            min: [0, "Occupied beds cannot be negative"],
            validate: {
                validator: function (value) {
                    return value <= this.capacity;
                },
                message: "Occupied beds cannot exceed ward capacity"
            }
        },

        department: {
            type: String,
            trim: true,
            maxlength: [100, "Department cannot exceed 100 characters"]
        },

        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active"
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    }
);

// Virtual field for available beds
wardSchema.virtual("availableBeds").get(function () {
    return this.capacity - this.occupiedBeds;
});

// Indexes
wardSchema.index({ status: 1 });
wardSchema.index({ department: 1 });

module.exports = mongoose.model("Ward", wardSchema);