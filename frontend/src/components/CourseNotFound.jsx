import { GraduationCapIcon } from "lucide-react";
import { Link } from "react-router";

const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <GraduationCapIcon className="size-10 text-primary" />
      </div>

      <h3 className="text-2xl font-bold">No courses found</h3>

      <p className="text-base-content/70">
        Ready to add courses? Add your first course to the Course Catalog.
      </p>

      <Link to="/create" className="btn btn-primary">
        Add First Course
      </Link>
    </div>
  );
};

export default CourseNotFound;