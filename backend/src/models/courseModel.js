import mongoose from "mongoose"
const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,

    },
    courseCode: {
        type: String,
        required: true,
        unique: true,
    },
    program: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    credits: {
        type: String,
        required: true,
    },
    courseType: {
        type: String,
        required: true,
    },
    courseStatus: {
        type: String,
        required: true,
    },
    isBookmarked:{
        type:Boolean,
        default:false,
    },

},
    { timestamps: true }
)

const Course = mongoose.model("Course", courseSchema)
export default Course