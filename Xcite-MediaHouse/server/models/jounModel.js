const mongoose  = require("mongoose");


const jounSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required:true,
            default: false,
        },
        description: {
            type: String,
            defualt: "user description"
        },
        profilePicture: {
            type: String,
            required: true,
            default:
                "https://res.cloudinary.com/dizvyn9b5/image/upload/v1632241265/sjddbfkcij5tz8vokcmo.jpg",
        },
        resume : {
            type: String,
            required: true,
            default:
                "https://res.cloudinary.com/dizvyn9b5/image/upload/v1632241265/sjddbfkcij5tz8vokcmo.jpg",
        },
        isjournalist:{
            type : Boolean,
            default : false,
            requried : true
        }
})

const jounModel = new mongoose.model("Journalist",jounSchema);

module.exports = jounModel