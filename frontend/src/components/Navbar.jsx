import { Link } from "react-router";
import { PlusIcon, BookmarkIcon, SearchIcon, } from "lucide-react";

const Navbar = ({
  search,
  setSearch,
  department,
  setDepartment,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <header className="bg-slate-800 border-b border-slate-700">
      <div className="ms-auto max-w-6xl p-4">

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            COURSE CATALOG
          </h1>
          




          <div className="flex items-center gap-4">
            <Link
              to="/bookmarks"
              className="btn bg-slate-600 hover:bg-slate-700 text-white"
            >
              <BookmarkIcon className="size-5" />
              <span>Bookmarked</span>
            </Link>

            <Link
              to="/create"
              className="btn bg-blue-600 hover:bg-blue-700 text-white"
            >
              <PlusIcon className="size-5" />
              <span>New Course</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">

          {/* Search */}
          <div className="flex items-center bg-white rounded px-2">
            <SearchIcon className="size-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by Course Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none px-2 py-1 w-80"
            />
          </div>

          {/* Department Filter */}
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="px-3 py-1 rounded bg-white"
          >
            <option value="">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>
            <option value="Commerce">Commerce</option>
            <option value="Arts & Humanities">Arts & Humanities</option>
            <option value="Science">Science</option>
            <option value="Mathematics">Mathematics</option>
          </select>

          {/* Sort */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-3 py-1 rounded bg-white"
          >
            <option value="">Sort by Semester</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>

        </div>

      </div>
    </header>
  );
};

export default Navbar;