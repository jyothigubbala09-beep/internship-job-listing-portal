import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Home.css";

function Home() {
  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/opportunities")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch opportunities");
        }

        return response.json();
      })
      .then((data) => {
        setOpportunities(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load opportunities");
        setLoading(false);
      });
  }, []);

  const domains = [
    "All",
    ...new Set(
      opportunities
        .map((item) => item.domain)
        .filter(Boolean)
    ),
  ];

  const filteredOpportunities = opportunities.filter((item) => {
    const title = item.title?.toLowerCase() || "";
    const company = item.company?.toLowerCase() || "";
    const itemDomain = item.domain || "";

    const searchText = search.toLowerCase();

    const matchesSearch =
      title.includes(searchText) ||
      company.includes(searchText);

    const matchesDomain =
      domain === "All" || itemDomain === domain;

    return matchesSearch && matchesDomain;
  });

  if (loading) {
    return (
      <div className="home-loading">
        <div className="loading-spinner"></div>
        <p>Finding opportunities for you...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-error">
        <div className="error-icon">!</div>
        <h2>{error}</h2>
        <p>Please make sure the backend server is running.</p>
      </div>
    );
  }

  return (
    <main className="home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">

          <span className="hero-badge">
            🚀 Build Your Career
          </span>

          <h1>
            Find Your Next
            <span> Opportunity</span>
          </h1>

          <p>
            Discover internships and job opportunities
            that match your skills, interests and career goals.
          </p>

          <div className="hero-search">
            <div className="search-input-wrapper">
              <span className="search-icon">⌕</span>

              <input
                type="text"
                placeholder="Search by job title or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            >
              {domains.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Domains" : item}
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className="hero-decoration">
          <div className="decoration-circle circle-one"></div>
          <div className="decoration-circle circle-two"></div>
          <div className="decoration-card">
            <span>💼</span>
            <strong>CareerHub</strong>
            <small>Opportunities await</small>
          </div>
        </div>
      </section>


      {/* Opportunities Section */}
      <section className="opportunities-section">

        <div className="section-heading">
          <div>
            <span className="section-label">EXPLORE</span>

            <h2>
              Latest Opportunities
            </h2>

            <p>
              Explore opportunities and take the next step
              toward your career.
            </p>
          </div>

          <div className="result-badge">
            {filteredOpportunities.length}{" "}
            {filteredOpportunities.length === 1
              ? "Opportunity"
              : "Opportunities"}
          </div>
        </div>


        {filteredOpportunities.length === 0 ? (
          <div className="no-results-card">
            <div className="no-results-icon">🔍</div>

            <h2>No opportunities found</h2>

            <p>
              Try searching for another title, company
              or domain.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setDomain("All");
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="opportunities-grid">

            {filteredOpportunities.map((item) => (
              <article
                className="opportunity-card-new"
                key={item._id}
              >

                <div className="card-top">
                  <div className="company-icon">
                    {item.company?.charAt(0)?.toUpperCase() || "C"}
                  </div>

                  <span className="domain-badge">
                    {item.domain}
                  </span>
                </div>


                <div className="card-content">

                  <h3>{item.title}</h3>

                  <p className="company-name">
                    {item.company}
                  </p>

                  <div className="job-info">

                    <span>
                      📍 {item.location}
                    </span>

                    <span>
                      💼 {item.experience}
                    </span>

                  </div>

                </div>


                <div className="card-footer">

                  <span className="opportunity-type">
                    Internship / Job
                  </span>

                  <Link
                    to={`/opportunity/${item._id}`}
                    className="view-button"
                  >
                    View Details
                    <span>→</span>
                  </Link>

                </div>

              </article>
            ))}

          </div>
        )}

      </section>

    </main>
  );
}

export default Home;