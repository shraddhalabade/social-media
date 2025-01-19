
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserSubmissionForm from "./components/UserSubmissionForm";
import AdminDashboard from "./components/AdminDashboard";


const App = () => {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        {/* Link to navigate to Admin page */}
        <nav>
          <Link to="/admin" style={{ padding: "10px", fontSize: "20px" }}>
            Admin Dashboard
          </Link>
        </nav>

        <Routes>
          {/* Render User Submission Form on the home page */}
          <Route path="/" element={<UserSubmissionForm />} />
          
          {/* Render Admin Dashboard on the /admin route */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};


export default App;



// function App() {
//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route path="/" element={<UserSubmissionForm />} />
//           <Route path="/admin" element={<AdminDashboard />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }