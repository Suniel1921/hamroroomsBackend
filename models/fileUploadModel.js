const mongoose = require("mongoose");
const slugify = require("slugify");

const fileUploadSchema = new mongoose.Schema({
    authUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authModel',
    },
    viewCount: {
        type: Number,
        default: 0,
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'categoryModel',
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    rent: {
        type: Number,
        required: true,
    },
    // imageUrl: {
    //     type: String,
    // },

    images: [{
        type: String,
    }],


    parking: {
        type: String,
        enum: ['yes', 'no'],
        required: true,
    },
    water: {
        type: String,
        enum: ['yes', 'no'],
        required: true,
    },
    floor: {
        type: String,
        enum: ['1st', '2nd', '3rd', '4th', '5th'],
        required: true,
    },
    roomType: {
        type: String,
        enum: ['single room', 'double room', 'room and kitchen', 'flat'],
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    slug: {
        type: String,
    }
}, { timestamps: true });

fileUploadSchema.pre('save', async function (next) {
    const originalSlug = slugify(this.address, { lower: true });
    let uniqueSlug = originalSlug;
    let slugCount = 0;

    while (true) {
        const existingRoom = await fileUploadModel.findOne({ slug: uniqueSlug });

        if (!existingRoom || existingRoom._id.equals(this._id)) {
            break;
        }

        slugCount++;
        uniqueSlug = `${originalSlug}-${slugCount}`;
    }

    this.slug = uniqueSlug;
    next();
});

const fileUploadModel = mongoose.model("fileUploadModel", fileUploadSchema);
module.exports = fileUploadModel;
