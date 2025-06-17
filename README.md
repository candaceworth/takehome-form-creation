
## Overview

This project is a React-based ticket purchasing form that integrates React Hook Form for form state management and validation. It allows users to select ticket quantities, enter payment details, and submit their order. This is my submission for the ActBlue take assignment. 

### Key features:

 * Dynamic ticket quantity inputs with validation

 * Reusable controlled inputs integrated with React Hook Form

 * Payment card form with validation for typical credit card fields

 * Data fetched from static JSON files moved to the public folder for easy access

 * Responsive and accessible UI using Material-UI components


### Installation

Clone the repository:

` git clone https://github.com/candaceworth/takehome-form-creation.git`
`cd takehome-form-creation`

Install dependencies:

`npm install or yarn install`

### Project Structure:
src/components/QuantityInput: Custom input component integrated with React Hook Form.

src/components/PaymentCard: Payment form capturing user billing and card info.

public/: Contains static JSON files used by the app, accessible via fetch.

src/utils/: Helper functions for processing tickets and prices.


### Notes:

When the "Get Tickets" button is clicked, the form data will be sent to console.log() under the variable names selectedWithPrice and paymentData.

JSON data files were moved to the public folder to enable fetching with fetch() in the browser.

Validation rules are applied via React Hook Form’s rules prop to ensure good UX and data integrity.

The form leverages MUI’s TextField components wrapped in ControlledInput for seamless integration.

The BandForm, QuantityInput PaymentCard components include unit test. 

