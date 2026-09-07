import { useState } from "react";
import opportunities from "../data/opportunities";

function Home() {
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("");

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const matchesSearch =
      opportunity.title.toLowerCase().includes(search.toLowerCase()) ||
      opportunity.company.toLowerCase().includes(search.toLowerCase());

    const matchesDomain =
      domain === "" || opportunity.domain === domain;

    return matchesSearch && matchesDomain;
  });

  return (
    <div className="home-container">
      <h1>Internship & Job Listing Portal</h1>

      <p>Find internships and job opportunities that match your skills.</p>

      <div className="filters">
        <input
          type="text"
          placeholder="Search opportunities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        >
          <option value="">All Domains</option>
          <option value="Web Development">Web Development</option>
          <option value="Python">Python</option>
          <option value="Artificial Intelligence">
            Artificial Intelligence
          </option>
          <option value="Data Science">Data Science</option>
        </select>
      </div>

      <div className="opportunity-list">
        {filteredOpportunities.length > 0 ? (
          filteredOpportunities.map((opportunity) => (
            <div className="opportunity-card" key={opportunity.id}>
              <h2>{opportunity.title}</h2>

              <h3>{opportunity.company}</h3>

              <p>
                <strong>Domain:</strong> {opportunity.domain}
              </p>

              <p>
                <strong>Location:</strong> {opportunity.location}
              </p>

              <p>
                <strong>Experience:</strong> {opportunity.experience}
              </p>

              <p>{opportunity.description}</p>

              <a href={`/opportunity/${opportunity.id}`}>
                View Details
              </a>
            </div>
          ))
        ) : (
          <p>No opportunities found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;