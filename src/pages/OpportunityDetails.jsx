import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./OpportunityDetails.css";

function OpportunityDetails() {
  const { id } = useParams();

  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/opportunities/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Opportunity not found");
        }

        return response.json();
      })
      .then((data) => {
        setOpportunity(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load opportunity");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="details-container">
        <p className="details-status">Loading opportunity...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-container">
        <div className="details-error">
          <h2>{error}</h2>
          <Link to="/">← Back to Opportunities</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="details-container">

      <Link to="/" className="back-link">
        ← Back to Opportunities
      </Link>

      <div className="details-card">

        <div className="details-header">
          <span className="details-domain">
            {opportunity.domain}
          </span>

          <h1>{opportunity.title}</h1>

          <p className="details-company">
            {opportunity.company}
          </p>
        </div>

        <div className="details-info">

          <div className="info-item">
            <span>📍 Location</span>
            <strong>{opportunity.location}</strong>
          </div>

          <div className="info-item">
            <span>💼 Experience</span>
            <strong>{opportunity.experience}</strong>
          </div>

        </div>

        <div className="details-description">
          <h2>About this opportunity</h2>

          <p>{opportunity.description}</p>
        </div>

        <div className="apply-section">

          <a
            href={opportunity.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="apply-button"
          >
            Apply Now →
          </a>

        </div>

      </div>

    </div>
  );
}

export default OpportunityDetails;