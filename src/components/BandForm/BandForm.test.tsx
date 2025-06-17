import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BandForm from "./BandForm";
import mockCalculateTickets from "../../utils/calculatesTickets";

// Mock Components
jest.mock("../QuantityInput/QuantityInput", () => ({
  __esModule: true,
  default: ({ name }) => (
    <div data-testid={`quantity-input-tickets.${name}`}>Quantity Input</div>
  ),
}));

jest.mock("../PaymentCard/PaymentCard", () => ({
  __esModule: true,
  default: ({ name }) => (
    <div data-testid={`payment-card-${name}`}>Payment Card</div>
  ),
}));

// Mock Utility Functions
jest.mock("../../utils/calculatesTickets", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    totalCost: 50,
    selectedTickets: {},
  })),
}));

// Mock React Hook Form
const mockHandleSubmit = jest.fn();
const mockFormData = {
  tickets: { "General Admission": 2, VIP: 1 },
  paymentInfo: { cardNumber: "1234567890123456", expiryDate: "12/25" },
};

jest.mock("react-hook-form", () => ({
  useForm: () => ({
    control: {},
    watch: jest.fn(() => ({})),
    handleSubmit: (callback) => () => {
      mockHandleSubmit();
      callback(mockFormData);
    },
    formState: { errors: {} },
  }),
  useWatch: jest.fn(() => ({
    "General Admission": 2,
    VIP: 1,
  })),
}));

describe("BandForm Component", () => {
  // Test Data
  const mockBand = {
    name: "Test Band",
    ticketTypes: [
      {
        name: "General Admission",
        description: "Standard ticket",
        cost: 25,
      },
      {
        name: "VIP",
        description: "VIP experience",
        cost: 75,
      },
    ],
  };

  // Test Helpers
  const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  const renderBandForm = () => render(<BandForm band={mockBand} />);

  beforeEach(() => {
    jest.clearAllMocks();
    (mockCalculateTickets as jest.Mock).mockReturnValue({
      totalCost: 50,
      selectedTickets: {},
    });
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  describe("Rendering", () => {
    it("displays payment section and total", () => {
      renderBandForm();

      expect(
        screen.getByTestId("payment-card-paymentInfo")
      ).toBeInTheDocument();
      expect(screen.getByText("TOTAL:")).toBeInTheDocument();
    });
  });

  describe("Form Submission", () => {
    it("calls ticket calculation utility with correct data", () => {
      renderBandForm();

      fireEvent.click(screen.getByRole("button", { name: /get tickets/i }));

      expect(mockCalculateTickets).toHaveBeenCalledWith(mockBand.ticketTypes, {
        "General Admission": 2,
        VIP: 1,
      });
    });

    it("logs correct form data on submission", () => {
      renderBandForm();

      fireEvent.click(screen.getByRole("button", { name: /get tickets/i }));

      expect(consoleSpy).toHaveBeenCalledWith(
        "prices",
        expect.objectContaining({
          totalCost: 50,
          selectedTickets: {},
        }),
        "payment data",
        expect.objectContaining({
          cardNumber: "1234567890123456",
          expiryDate: "12/25",
        })
      );
    });
  });
});
