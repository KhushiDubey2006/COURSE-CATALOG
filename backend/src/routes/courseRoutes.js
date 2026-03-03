import express from "express";

import { createCourse, deleteCourse, getAllCourses, getCourseById, toggleBookmark, updateCourse } from "../controllers/courseController.js";

const router = express.Router()
router.get("/", getAllCourses)
router.get("/:id", getCourseById)
router.post("/", createCourse)
router.put("/:id", updateCourse)
router.delete("/:id", deleteCourse)
router.patch("/:id/bookmark",toggleBookmark);


export default router