import api from "../lib/axios";
import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { createPath, Link, useNavigate } from "react-router";

const CreatePage = () => {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [program, setProgram] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [credits, setCredits] = useState("");
  const [courseType, setCourseType] = useState("");
  const [courseStatus, setCourseStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

  


    try {
      await api.post("/courses", {
        courseName,
        courseCode,
        program,
        department,
        semester: Number(semester),
        credits: Number(credits),
        courseType,
        courseStatus,
      });

      toast.success("Course created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating course", error);
      toast.error("Failed to create course.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50">
      <div className="max-w-2xl mx-auto px-4 py-6">

        <Link
          to="/"
          className="flex items-center gap-2 text-slate-600 mb-4 hover:text-slate-900"
        >
          <ArrowLeftIcon className="size-5" />
          Back to Courses
        </Link>

        <div className="bg-white shadow-lg rounded-xl p-5">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">
            Create New Course
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">

            <div>
              <label className="block text-sm font-medium mb-1">
                Course Name
              </label>
              <input
                type="text"
                placeholder="e.g. Java"
                className="w-full border rounded-lg px-3 py-2"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Course Code
              </label>
              <input
                type="text"
                placeholder="e.g. CS101"
                className="w-full border rounded-lg px-3 py-2"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Program
              </label>
              <input
                type="text"
                placeholder="e.g. B.Tech"
                className="w-full border rounded-lg px-3 py-2"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                required
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts & Humanities">Arts & Humanities</option>
                <option value="Science">Science</option>
                <option value="Mathematics">Mathematics</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Semester
              </label>
              <input
                type="number"
                min="1"
                max="8"
                placeholder="e.g. 1"
                className="w-full border rounded-lg px-3 py-2"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Credits
              </label>
              <input
                type="number"
                min="1"
                max="6"
                placeholder="e.g. 1"
                className="w-full border rounded-lg px-3 py-2"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Course Type
              </label>
              <input
                type="text"
                placeholder="Theory / Practical"
                className="w-full border rounded-lg px-3 py-2"
                value={courseType}
                onChange={(e) => setCourseType(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Course Status
              </label>
              <input
                type="text"
                placeholder="Active / Inactive"
                className="w-full border rounded-lg px-3 py-2"
                value={courseStatus}
                onChange={(e) => setCourseStatus(e.target.value)}
                required
              />
              
  
            </div>


            <div className="text-right pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"

              >
                {loading ? "Creating..." : "Create Course"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
export default CreatePage;