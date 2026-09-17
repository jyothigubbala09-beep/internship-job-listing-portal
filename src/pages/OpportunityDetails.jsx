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
      <div className="details-loading">
        <div className="details-spinner"></div>
        <p>Loading opportunity...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-error-page">
        <div className="details-error-icon">!</div>
        <h2>{error}</h2>
        <p>The opportunity may have been removed or does not exist.</p>

        <Link to="/" className="back-home-button">
          ← Back to Opportunities
        </Link>
      </div>
    );
  }

  return (
    <main className="details-page">

      <div className="details-wrapper">

        {/* Back Button */}
        <Link to="/" className="details-back">
          ← Back to Opportunities
        </Link>


        {/* Main Header Card */}
        <section className="details-hero-card">

          <div className="details-company-icon">
            {opportunity.company?.charAt(0)?.toUpperCase() || "C"}
          </div>

          <div className="details-hero-content">

            <span className="details-domain">
              {opportunity.domain}
            </span>

            <h1>{opportunity.title}</h1>

            <p className="details-company-name">
              {opportunity.company}
            </p>

          </div>

        </section>


        {/* Main Content */}
        <div className="details-layout">

          {/* Left Content */}
          <section className="details-main-content">

            <div className="details-section">

              <h2>About this opportunity</h2>

              <p>
                {opportunity.description}
              </p>

            </div>


            <div className="details-section">

              <h2>Opportunity Information</h2>

              <div className="details-info-grid">

                <div className="details-info-box">
                  <span className="info-icon">📍</span>

                  <div>
                    <small>Location</small>
                    <strong>{opportunity.location}</strong>
                  </div>
                </div>


                <div className="details-info-box">
                  <span className="info-icon">💼</span>

                  <div>
                    <small>Experience</small>
                    <strong>{opportunity.experience}</strong>
                  </div>
                </div>


                <div className="details-info-box">
                  <span className="info-icon">🏷️</span>

                  <div>
                    <small>Domain</small>
                    <strong>{opportunity.domain}</strong>
                  </div>
                </div>


                <div className="details-info-box">
                  <span className="info-icon">🏢</span>

                  <div>
                    <small>Company</small>
                    <strong>{opportunity.company}</strong>
                  </div>
                </div>

              </div>

            </div>

          </section>


          {/* Right Apply Card */}
          <aside className="apply-card">

            <div className="apply-card-icon">
              🚀
            </div>

            <h2>Ready to apply?</h2>

            <p>
              Take the next step toward your career.
              Apply for this opportunity through the
              official application link.
            </p>

            <a
              href={opportunity.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="apply-button-new"
            >
              Apply Now
              <span>→</span>
            </a>

            <div className="apply-note">
              🔒 You will be redirected to the application website.
            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}

export default OpportunityDetails;