import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../lib/axios";
import toast from "react-hot-toast";
import CourseCard from "../components/CourseCard";
import { ClipboardList } from "lucide-react";
import { Link } from "react-router";


const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses");
        setCourses(res.data);
      } catch (error) {
        toast.error("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  //  Search
  let filteredCourses = courses;

  if (search) {
    filteredCourses = filteredCourses.filter((course) =>
      course.courseName.toLowerCase().includes(search.toLowerCase())
    );
  }

  //  Filter
  if (department) {
    filteredCourses = filteredCourses.filter(
      (course) => course.department === department
    );
  }

  //  Sort
  if (sortOrder === "asc") {
    filteredCourses = [...filteredCourses].sort(
      (a, b) => a.semester - b.semester
    );
  }

  if (sortOrder === "desc") {
    filteredCourses = [...filteredCourses].sort(
      (a, b) => b.semester - a.semester
    );
  }





  return (



    <div className="min-h-screen bg-base-200">

      <Navbar
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />


      <div className="max-w-7xl mx-auto p-4 mt-6">

        {/* Loading */}
        {loading && (
          <p className="text-center text-primary py-6">
            Loading courses...
          </p>
        )}


        {filteredCourses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">

            <div className="w-16 h-16 flex items-center justify-center 
                          rounded-full bg-primary/10 shadow-inner mb-4">
              <ClipboardList size={24} className="text-primary" />
            </div>

            <h2 className="text-lg font-semibold mb-1">
              {courses.length === 0
                ? "No courses yet"
                : "No matching courses found"}
            </h2>

            <p className="text-sm text-base-content/60 mb-4">
              {courses.length === 0
                ? "Add your first course to start building your catalog."
                : "Try adjusting your search or filters."}
            </p>

            {/* Button  */}
            {courses.length === 0 && (
              <Link to="/create" className="btn btn-primary btn-sm">
                Add Your First Course
              </Link>
            )}

          </div>
        )}

        {/* Course Grid */}
        {filteredCourses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                setCourses={setCourses}
              />
            ))}
          </div>
        )}



      </div>

    </div>






  );
};










export default HomePage;