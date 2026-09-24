import { useEffect, useState } from "react";
import "../adminDashboard.css";

function AdminDashboard() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    domain: "",
    location: "",
    experience: "",
    description: "",
    applicationLink: ""
  });

  const [opportunities, setOpportunities] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Get all opportunities
  const fetchOpportunities = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/opportunities"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch opportunities");
      }

      const data = await response.json();

      setOpportunities(data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load opportunities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Add or update opportunity
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (
      !formData.title.trim() ||
      !formData.company.trim() ||
      !formData.domain.trim() ||
      !formData.location.trim() ||
      !formData.experience.trim() ||
      !formData.description.trim() ||
      !formData.applicationLink.trim()
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    // Validate URL
    try {
      new URL(formData.applicationLink);
    } catch {
      setMessage("Please enter a valid application link.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const url = editingId
        ? `http://localhost:5000/api/admin/opportunities/${editingId}`
        : "http://localhost:5000/api/admin/opportunities";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save opportunity"
        );
      }

      if (editingId) {
        setMessage("Opportunity updated successfully!");
      } else {
        setMessage("Opportunity added successfully!");
      }

      // Clear form
      setFormData({
        title: "",
        company: "",
        domain: "",
        location: "",
        experience: "",
        description: "",
        applicationLink: ""
      });

      // Exit edit mode
      setEditingId(null);

      // Refresh opportunities
      fetchOpportunities();
    } catch (error) {
      console.error(error);
      setMessage("Failed to save opportunity");
    } finally {
      setSaving(false);
    }
  };

  // Delete opportunity
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this opportunity?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/opportunities/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete opportunity"
        );
      }

      setMessage("Opportunity deleted successfully!");

      fetchOpportunities();
    } catch (error) {
      console.error(error);
      setMessage("Failed to delete opportunity");
    }
  };

  // Edit opportunity
  const handleEdit = (item) => {
    setEditingId(item._id);

    setFormData({
      title: item.title || "",
      company: item.company || "",
      domain: item.domain || "",
      location: item.location || "",
      experience: item.experience || "",
      description: item.description || "",
      applicationLink: item.applicationLink || ""
    });

    setMessage("");
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);

    setFormData({
      title: "",
      company: "",
      domain: "",
      location: "",
      experience: "",
      description: "",
      applicationLink: ""
    });

    setMessage("");
  };

  return (
    <div className="admin-container">

      <h1 className="admin-title">
        Admin Dashboard
      </h1>

      {/* Add / Edit Form */}
      <div className="admin-form">

        <h2>
          {editingId
            ? "Edit Opportunity"
            : "Add Opportunity"}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Opportunity Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <input
            type="text"
            name="domain"
            placeholder="Domain"
            value={formData.domain}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <input
            type="url"
            name="applicationLink"
            placeholder="Application Link"
            value={formData.applicationLink}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <button
            type="submit"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : editingId
              ? "Update Opportunity"
              : "Add Opportunity"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          )}

        </form>

        {message && (
          <p className="message">
            {message}
          </p>
        )}

      </div>

      {/* Existing Opportunities */}
      <h2>Existing Opportunities</h2>

      {loading ? (
        <p>Loading opportunities...</p>
      ) : opportunities.length === 0 ? (
        <p>No opportunities found.</p>
      ) : (
        <div className="opportunity-list">

          {opportunities.map((item) => (

            <div
              className="opportunity-card"
              key={item._id}
            >

              <h3>{item.title}</h3>

              <p>
                <strong>Company:</strong>{" "}
                {item.company}
              </p>

              <p>
                <strong>Domain:</strong>{" "}
                {item.domain}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {item.location}
              </p>

              <p>
                <strong>Experience:</strong>{" "}
                {item.experience}
              </p>

              <p>
                <strong>Description:</strong>{" "}
                {item.description}
              </p>

              <button
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default AdminDashboard;