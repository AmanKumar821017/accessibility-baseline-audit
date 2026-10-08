import { useEffect, useId, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function App() {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState("Enter a service name and select Search.");
  const [loading, setLoading] = useState(false);

  async function searchServices(event) {
    event.preventDefault();
    setLoading(true);
    setStatus("Searching services...");

    try {
      const response = await fetch(
        `${API_URL}/api/services?query=${encodeURIComponent(query)}`
      );

      if (!response.ok) throw new Error("Request failed");

      const data = await response.json();
      setServices(data.services);

      setStatus(
        data.services.length
          ? `${data.services.length} service${data.services.length === 1 ? "" : "s"} found.`
          : "No services found."
      );
    } catch {
      setServices([]);
      setStatus("Unable to load services. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    document.title = "Public Service Search";
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <header className="site-header">
        <div className="container">
          <a href="/" className="brand" aria-label="Public Service Search home">
            Public Service Search
          </a>

          <nav aria-label="Primary navigation">
            <a href="#services">Services</a>
            <a href="#about">About</a>
          </nav>
        </div>
      </header>

      <main id="main-content" className="container">
        <section aria-labelledby="page-title">
          <p className="eyebrow">Accessible public-service foundation</p>
          <h1 id="page-title">Find a government service</h1>
          <p>
            Search a small sample catalogue representing the first vertical
            feature slice of this project.
          </p>

          <form onSubmit={searchServices} className="search-form">
            <label htmlFor={inputId}>Service name</label>
            <div className="search-row">
              <input
                id={inputId}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="e.g. Aadhaar"
              />
              <button type="submit" disabled={loading}>
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>

          <p className="status" role="status" aria-live="polite">
            {status}
          </p>
        </section>

        <section id="services" aria-labelledby="results-title">
          <h2 id="results-title">Services</h2>

          {services.length > 0 && (
            <ul className="service-list">
              {services.map((service) => (
                <li key={service.id}>
                  <article>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                    <a href={service.url}>View service</a>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section id="about" aria-labelledby="about-title">
          <h2 id="about-title">About this prototype</h2>
          <p>
            This is an educational implementation inspired by the audit task.
            It is not an official government service.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>Accessibility Baseline & Architecture Audit</p>
        </div>
      </footer>
    </>
  );
}
