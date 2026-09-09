import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    return <h2>Loading opportunity...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>{opportunity.title}</h1>

      <p>
        <strong>Company:</strong> {opportunity.company}
      </p>

      <p>
        <strong>Domain:</strong> {opportunity.domain}
      </p>

      <p>
        <strong>Location:</strong> {opportunity.location}
      </p>

      <p>
        <strong>Experience:</strong> {opportunity.experience}
      </p>

      <p>
        <strong>Description:</strong>
      </p>

      <p>{opportunity.description}</p>

      <a
        href={opportunity.applicationLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        Apply Now
      </a>
    </div>
  );
}

export default OpportunityDetails;