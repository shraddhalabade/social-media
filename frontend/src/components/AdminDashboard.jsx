import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]); // State to store user submissions
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user submissions from the backend API
    const fetchSubmissions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users"); // Backend API endpoint
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user submissions:", error);
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []); // Runs once when the component is mounted

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      {loading ? (
        <p>Loading submissions...</p>
      ) : (
        <div>
          {users.length > 0 ? (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Social Media Handle</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Uploaded Images</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.name}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.handle}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {/* Check if imagePaths exist and map through them */}
                      {user.imagePaths && user.imagePaths.length > 0 ? (
                        user.imagePaths.map((image, index) => (
                          <a
                            key={index}
                            href={`http://localhost:5000${image}`} // Correct path to image
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: "inline-block", margin: "5px" }}
                          >
                            <img
                              src={`http://localhost:5000${image}`} // Correct image path
                              alt={`Uploaded by ${user.name}`}
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                border: "1px solid #ddd",
                              }}
                            />
                          </a>
                        ))
                      ) : (
                        <p>No images found.</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No user submissions found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;