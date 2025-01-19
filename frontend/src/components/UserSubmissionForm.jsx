import React, { useState } from "react";

const UserSubmissionForm = () => {
  // State variables
  const [name, setName] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [images, setImages] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");

  // Handle file input changes
  const handleImageChange = (e) => {
    setImages(e.target.files); // Store the selected files
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !socialHandle || images.length === 0) {
      setStatusMessage("Please fill out all fields and upload at least one image.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("handle", socialHandle);

    // Append each selected image to the FormData object
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]); // Append each image
    }

    try {
      // Submit data using fetch API
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatusMessage("Submission successful!");
        setName("");
        setSocialHandle("");
        setImages([]);
      } else {
        throw new Error("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatusMessage("Error: Unable to submit the form.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "80px",height:"800px" }}>
      <h1>User Submission Form</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            style={{ width: "100%", padding: "8px", marginTop: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>Social Media Handle:</label>
          <input
            type="text"
            value={socialHandle}
            onChange={(e) => setSocialHandle(e.target.value)}
            placeholder="Enter your social handle"
            required
            style={{ width: "100%", padding: "8px", marginTop: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "25px" }}>
          <label>Upload Images:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
            style={{ width: "100%", marginTop: "10px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
        
      </form>
      <br />
     
      {statusMessage && <p style={{ marginTop: "10px" }}>{statusMessage}</p>}
    </div>
    
  );
};

export default UserSubmissionForm;