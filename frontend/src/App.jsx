import { BrowserRouter, Routes, Route } from "react-router";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import BookmarkPage from "./pages/BookmarkCoursePage";
import CreatePage from "./pages/CreatePage";
import CourseDetailPage from "./pages/CourseDetailPage";

function App() {
  const [courses, setCourses] = useState([]);
  

  return (
    
      <Routes>

        <Route
          path="/"
           element={
           <HomePage
             
             
           
            />
          }
        />

        <Route
          path="/bookmarks"
          element={
            <BookmarkPage
              
            />
          }
        />

        <Route path="/create" element={<CreatePage />} />
        <Route path="/course/:id" element={<CourseDetailPage />} />

      </Routes>

  );
}

export default App;