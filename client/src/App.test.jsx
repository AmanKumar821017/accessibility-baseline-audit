import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "./App";

test("renders an accessible service search form", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /find a government service/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/service name/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
});
