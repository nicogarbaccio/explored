import React, { useState } from "react";

const CourseContext = React.createContext();

function CourseProvider({ children }) {
    const [currentCourse, setCurrentCourse] = useState(null);

    return (
      <CourseContext.Provider value={{ currentCourse, setCurrentCourse }}>
        {children}
      </CourseContext.Provider>
    );
  }

export { CourseContext, CourseProvider };