import { Link, useLocation } from "react-router";
import { Edit2, Trash2, Bookmark, Award, GraduationCap } from "lucide-react";
import { useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { formatDate } from "../lib/utils";


const CourseCard = ({
  course,
  setCourses,



}) => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const isActivePage = location.pathname === `/course/${course._id}`;
  const isBookmarked = course.isBookmarked;


  // DELETE
  const handleDelete = async (e) => {
    e.stopPropagation();



    try {
      await api.delete(`/courses/${course._id}`);

      setCourses((prev) =>
        prev.filter((c) => c._id !== course._id)
      );

      toast.success("Course deleted successfully");
    } catch (error) {
      toast.error("Failed to delete course");
    }
  };

  // BOOKMARK
  const handleBookmark = async (e) => {
    e.preventDefault();

    try {
      const res = await api.patch(
        `/courses/${course._id}/bookmark`
      );

      const updatedCourse = res.data;

      setCourses((prev) =>

        prev.map((c) =>
          c._id === updatedCourse._id ? updatedCourse : c));





      toast.success(
        updatedCourse.isBookmarked
          ? "Added to bookmarks"
          : "Removed from bookmarks"
      );

    } catch (error) {
      toast.error("Bookmark failed");
    }
  };

  return (
    <>
      {/*CARD*/}
      <Link
        to={`/course/${course._id}`}
        className={`block rounded-xl bg-white p-5 shadow-sm border transition duration-200
        hover:shadow-lg

        ${isActivePage ? "border-blue-500" : "border-gray-200"}`}
      >

        {/* Top Row */}
        <div className="flex justify-between items-start text-xs text-gray-400">
          <span>ID: {course._id}</span>

          <span className="px-2 py-1 text-xs font-semibold rounded-md text-sm bg-primary/10  text-primary">
            Sem {course.semester}
          </span>
        </div>


        {/* Course Code */}
        <p className="text-sm text-based-content/70">
          {course.courseCode}
        </p>

        {/* Course Name */}
        <div className="flex items-center gap-2">
          <GraduationCap size={18} className="text grey-700" />
          <h2 className="text-xl font-semibold text-based-content">
            {course.courseName}
          </h2>
        </div>

        {/* Middle Info Grid */}
        <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 mt-4">

          <p><span className="text-gray-400">Dept:</span> {course.department}</p>

          <p><span className="text-gray-400">Program:</span> {course.program}</p>

          <p className="flex items-center gap-1">
            <Award className="size-4 text-yellow-500" />
            {course.credits} Credits
          </p>

          <p><span className="text-gray-400">Type:</span> {course.courseType}</p>

          <p className="col-span-2 text-xs text-gray-400 mt-1">
            {formatDate(new Date(course.createdAt))}
          </p>

        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-center mt-4">

          {/* Status */}
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium
              ${course.courseStatus?.toLowerCase() === "active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600"
              }`}
          >
            {course.courseStatus}
          </span>

          {/* Actions */}
          <div className="flex items-center gap-4">

            <button onClick={handleBookmark}>
              <Bookmark
                className={`size-4 transition
                ${isBookmarked
                    ? "text-blue-600 fill-blue-600"
                    : "text-gray-400"
                  }`}
              />
            </button>

            <Edit2 className="size-4 text-amber-500 hover:scale-110 transition" />

            <button
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            >
              <Trash2 className="size-4 text-red-500 hover:scale-110 transition" />
            </button>

          </div>
        </div>

      </Link>

      {/* Delete Modal */}
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-red-600">
              Delete Course
            </h3>
            <p className="py-4">
              Are you sure you want to delete <b>{course.courseName}?</b>This action cant be undone.
            </p>
            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-error"

                onClick={handleDelete}>





                Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default CourseCard;