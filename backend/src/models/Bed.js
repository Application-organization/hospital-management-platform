const mongoose = require("mongoose");


const bedSchema = new mongoose.Schema(
    {
        bedNumber: {
            type: String,
            required: [true, "Bed number is required"],
            trim: true,
            uppercase: true
        },

        ward: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ward",
            required: [true, "Ward reference is required"]
        },

        status: {
            type: String,
            enum: [
                "Available",
                "Occupied",
                "Maintenance",
                "Reserved"
            ],
            default: "Available"
        },

        bedType: {
            type: String,
            enum: [
                "General",
                "ICU",
                "Emergency",
                "Private",
                "Isolation"
            ],
            default: "General"
        },

        features: [
            {
                type: String,
                trim: true
            }
        ],

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);


// Prevent duplicate bed numbers inside the same ward
bedSchema.index(
    {
        bedNumber: 1,
        ward: 1
    },
    {
        unique: true
    }
);


// Faster queries
bedSchema.index({ ward: 1 });
bedSchema.index({ status: 1 });


module.exports = mongoose.model("Bed", bedSchema);