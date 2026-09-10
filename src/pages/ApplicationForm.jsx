import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ApplicationForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          opportunityId: id
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit application");
      }

      setMessage(data.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        resume: ""
      });
    } catch (error) {
      console.error(error);
      setMessage("Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Apply for Opportunity</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Phone</label>
          <br />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Resume Link</label>
          <br />
          <input
            type="url"
            name="resume"
            value={formData.resume}
            onChange={handleChange}
            placeholder="https://..."
            required
          />
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>

      {message && <h3>{message}</h3>}

      <br />

      <button onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}

export default ApplicationForm;