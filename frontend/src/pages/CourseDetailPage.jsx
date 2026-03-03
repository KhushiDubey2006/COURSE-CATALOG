import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";

const CourseDetailPage = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data);
      } catch (error) {
        console.error("Error fetching course", error);
        toast.error("Failed to fetch course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);



  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await api.delete(`/courses/${id}`);
      toast.success("Course deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting course", error);
      toast.error("Failed to delete course");
    }
  };
  const handleSave = async () => {
    if (!course.courseName.trim() || !course.courseCode.trim()) {
      toast.error("Please fill required fields");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/courses/${id}`, {
        ...course,
        semester: Number(course.semester),
        credits: Number(course.credits),
      });

      toast.success("Course updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating course", error);
      toast.error("Failed to update course");
    } finally {
      setSaving(false);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (


    <div className="min-h-screen bg-base-200 py-5">
      <div className="max-w-2xl mx-auto px-4">

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-base-content/70 hover:text-base-content"
          >
            <ArrowLeftIcon className="size-5" />
            Back
          </Link>

          <button
            onClick={handleDelete}
            className="btn btn-sm btn-outline border border-red-500 text-red-600 bg-transparent hover:bg-red-200 hover:text-black transition-all duration-200 focus:outline-none">
            <Trash2Icon className="size-4" />
            Delete
          </button>
        </div>

        {/* Card */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="card bg-base-100 shadow-md"
        >
          <div className="card-body space-y-1">

            <h2 className="text-xl font-semibold mb-3">
              Update Course
            </h2>

            {/* Course Name */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium">Course Name</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Java"
                value={course.courseName}
                onChange={(e) =>
                  setCourse({ ...course, courseName: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Course Code */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium">Course Code</span>
              </label>
              <input
                type="text"
                placeholder="e.g. CS101"
                value={course.courseCode}
                onChange={(e) =>
                  setCourse({ ...course, courseCode: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Program */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium">Program</span>
              </label>
              <input
                type="text"
                placeholder="e.g. B.Tech"
                value={course.program}
                onChange={(e) =>
                  setCourse({ ...course, program: e.target.value })
                }
                className="input input-bordered w-full"
              />
            </div>

            {/* Department */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium">Department</span>
              </label>
              <select
                value={course.department}
                onChange={(e) =>
                  setCourse({ ...course, department: e.target.value })
                }
                className="select select-bordered w-full"
              >
                <option>Computer Science</option>
                <option>Mechanical Engineering</option>
                <option>Commerce</option>
                <option>Arts & Humanities</option>
                <option>Science</option>
                <option>Mathematics</option>
              </select>
            </div>

            {/* Semester & Credits in Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">Semester</span>
                </label>
                <input
                  placeholder="e.g. 1"
                  type="number"
                  min="1"
                  max="8"
                  required
                  className="input input-bordered w-full"
                  value={course.semester}
                  onChange={(e) =>
                    setCourse({ ...course, semester: e.target.value })
                  }
                />
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">Credits</span>
                </label>
                <input
                  placeholder="e.g. 1"
                  type="number"
                  min="1"
                  max="6"
                  required
                  className="input input-bordered w-full"
                  value={course.credits}
                  onChange={(e) =>
                    setCourse({ ...course, credits: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Course Type */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium">Course Type</span>
              </label>
              <input
                placeholder="Theory / Practical"
                type="text"
                value={course.courseType}
                onChange={(e) =>
                  setCourse({ ...course, courseType: e.target.value })
                }
                className="input input-bordered w-full"
              />
            </div>

            {/* Course Status */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium">Course Status</span>
              </label>
              <input
                placeholder="Active / Inactive"
                type="text"
                value={course.courseStatus}
                onChange={(e) =>
                  setCourse({ ...course, courseStatus: e.target.value })
                }
                className="input input-bordered w-full"
              />
          
            
            </div>

            <div className="flex justify-end pt-3">
              <button
                type="submit"
                disabled={saving}
                className="btn btn-primary text-white semibold"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
export default CourseDetailPage;
