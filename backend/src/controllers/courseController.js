import Course from "../models/courseModel.js";

export async function getAllCourses(_, res) {
    //     console.log("getAllCourses(")
    //     res.status(200).json("getAllCourses")
    try {
        const courses = await Course.find().sort({ createdAt: -1 })
        res.status(200).json(courses)
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }

}

export async function getCourseById(req, res) {
    // console.log("getCourseById")
    // res.status(200).json("getCourseById")
    try {
        const course = await Course.findById(req.params.id);
        if (!course)
            return res.status(404).json({ message: "Course not found" })
        res.status(200).json(course)
    } catch {
        res.status(500).json({ message: "Internal Server error" })
    }
}

export async function createCourse(req, res) {
    //     console.log("createCourse")
    //     res.status(200).json("createCourse")
    try {
        const { courseName, courseCode, program, department, semester, credits, courseType, courseStatus } = req.body
        if (!courseName || !courseCode || !program || !department || !semester || !credits || !courseType || !courseStatus) {
            return res.status(404).json({ message: 'All fields are required' })
        }
        const course = new Course({ courseName, courseCode, program, department, semester, credits, courseType, courseStatus })
        const savedCourse = await course.save()
        res.status(201).json({ savedCourse })
    } catch (error) {
        console.error("Error in createCourse Controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function updateCourse(req, res) {
    //console.log("updateCourse")
    //res.status(200).json("updateCourse")
    try {
        const { courseName, courseCode, program, department, semester, credits, courseType, courseStatus } = req.body
        const updateCourse = await Course.findByIdAndUpdate(req.params.id, {
            courseName, courseCode, program, department, semester, credits, courseType, courseStatus
        }, { new: true });
        if (!updateCourse) return res.status(404).json({ message: "Course not found" })
        res.status(200).json(updateCourse)
    } catch (error) {
        console.error("Error in updateCourse controller ")
        res.status(500).json({ message: "Internal Server error" })

    }
}

export async function deleteCourse(req, res) {
    // console.log("deleteCourse")
    // res.status(200).json("deleteCourse")
    try {
        const deleteCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deleteCourse)
            return res.status(404).json({ message: "Course not found" })
        res.status(200).json({ message: "Course Deleted Successfully" })
    } catch (error) {
        res.status(500).json({ message: "Internal Server error" });
    }
}

export const toggleBookmark = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        course.isBookmarked = !course.isBookmarked;
        await course.save();

        res.json(course);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

