import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    ...new Set(opportunities.map((item) => item.domain))
  ];

  const filteredOpportunities = opportunities.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.company.toLowerCase().includes(search.toLowerCase());

    const matchesDomain =
      domain === "All" || item.domain === domain;

    return matchesSearch && matchesDomain;
  });

  if (loading) {
    return <h2>Loading opportunities...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Internship & Job Opportunities</h1>

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
        {domains.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <div>
        {filteredOpportunities.length === 0 ? (
          <p>No opportunities found.</p>
        ) : (
          filteredOpportunities.map((item) => (
            <div key={item._id}>
              <h2>{item.title}</h2>

              <p>
                <strong>Company:</strong> {item.company}
              </p>

              <p>
                <strong>Domain:</strong> {item.domain}
              </p>

              <p>
                <strong>Location:</strong> {item.location}
              </p>

              <p>
                <strong>Experience:</strong> {item.experience}
              </p>

              <Link to={`/opportunity/${item._id}`}>
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;