import { useParams } from "react-router-dom";
import opportunities from "../data/opportunities";

function OpportunityDetails() {
  const { id } = useParams();

  const opportunity = opportunities.find(
    (item) => item.id === Number(id)
  );

  if (!opportunity) {
    return <h2>Opportunity not found</h2>;
  }

  return (
    <div className="details-container">
      <h1>{opportunity.title}</h1>

      <h2>{opportunity.company}</h2>

      <p>
        <strong>Domain:</strong> {opportunity.domain}
      </p>

      <p>
        <strong>Location:</strong> {opportunity.location}
      </p>

      <p>
        <strong>Experience:</strong> {opportunity.experience}
      </p>

      <h3>Job Description</h3>

      <p>{opportunity.description}</p>

      <a
        href={opportunity.applicationLink}
        target="_blank"
        rel="noreferrer"
      >
        Apply Now
      </a>
    </div>
  );
}

export default OpportunityDetails;