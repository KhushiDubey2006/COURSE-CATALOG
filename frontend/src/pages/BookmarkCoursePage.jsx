import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Bookmark } from "lucide-react";
import api from "../lib/axios";
import CourseCard from "../components/CourseCard";


const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await api.get("/courses");

        const bookmarkedCourses = res.data.filter(
          (course) => course.isBookmarked === true
        );

        setBookmarks(bookmarkedCourses);
      } catch (error) {
        console.error("Failed to fetch bookmarks");
      }
    };

    fetchBookmarks();
  }, []);


const visibleBookmarks = bookmarks.filter(
    (c) => c.isBookmarked
  );


  const totalCredits = visibleBookmarks.reduce(
    (sum, course) => sum + Number(course.credits),
    0
  );

  

  return (
    <div className="min-h-screen bg-base-200">

      {/* HEADER */}
      <div className="bg-base-100 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

          {/* Left Side */}
          <div className="flex items-center gap-4">
            <Link to="/" className="btn btn-ghost btn-sm">
              <ArrowLeft size={18} />
            </Link>

            <div>
              <h1 className="text-2xl font-bold">
                Bookmarked Courses
              </h1>
              <p className="text-sm  font-medium  text-base-content/70">
                {visibleBookmarks.length} saved courses
              </p>
            </div>
          </div>

          {/*  Total Credits */}
          <div className="bg-primary/10 border border-primary/20 
                px-5 py-3 rounded-xl text-right">

            <p className="text-xs uppercase tracking-wide text-base-content/70 font-medium">
              Total Credits
            </p>

            <p className="text-2xl font-bold text-primary">
              {totalCredits}
            </p>

          </div>

        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4">

        {visibleBookmarks.length === 0 ? (


          <div className="flex flex-col items-center justify-center py-20 text-center">


            <div className="w-16 h-16 flex items-center justify-center 
                          rounded-full bg-primary/10 shadow-inner mb-4">
              <Bookmark size={24} className="text-primary" />
            </div>

            <h2 className="text-base font-semibold mb-1">
              No bookmarked courses yet
            </h2>



            <Link to="/" className="btn btn-outline btn-sm mt-4">
              Browse Courses
            </Link>

          </div>

        ) : (


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleBookmarks.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                isBookmarksPage={true}
                setCourses={setBookmarks}
              />
            ))}
          </div>

        )}

      </div>
    </div>
  );
};
export default BookmarkPage;