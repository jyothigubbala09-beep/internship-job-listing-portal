import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import OpportunityDetails from "./pages/OpportunityDetails";
import ApplicationForm from "./pages/ApplicationForm";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/opportunity/:id"
          element={<OpportunityDetails />}
          />
          <Route
  path="/apply/:id"
  element={<ApplicationForm />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;