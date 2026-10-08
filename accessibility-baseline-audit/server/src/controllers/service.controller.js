import { services } from "../services/service.data.js";

export function listServices(req, res) {
  const query = String(req.query.query || "").trim().toLowerCase();

  const filtered = query
    ? services.filter((service) =>
        `${service.name} ${service.description}`.toLowerCase().includes(query)
      )
    : services;

  res.json({
    services: filtered,
    count: filtered.length
  });
}
