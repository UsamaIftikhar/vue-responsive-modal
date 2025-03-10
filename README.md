# Vue 2 Responsive Customer Search Modal

This project implements a responsive customer search interface built using Vue 2, Vuetify, and modern JavaScript. It follows the design specifications from the provided Figma design.

## Features & Implementation Status

- [x] Responsive modal layout built in Vue 2 with Vuetify
- [x] Modern CSS/SCSS implementation
- [x] Clean, maintainable code structure
- [x] Mock data integration with Axios
- [x] Dynamic customer search functionality
- [x] Modal grows with search results while maintaining 32px margins
- [x] Centered modal positioning
- [x] Text truncation for customer names and cities
- [x] Vertically scrollable modal content
- [x] Non-shrinking initials square and action button
- [x] Tablet and desktop responsive design
- [x] Loading states with skeleton loaders
- [x] Error handling and user feedback
- [x] Dynamic record count display
- [x] Montserrat font integration

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/vue2-customer-search.git
   ```

2. Navigate to project directory:
   ```sh
   cd vue2-customer-search
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

4. Run development server:
   ```sh
   npm run serve
   ```

## Technologies Used

- Vue 2
- Vuetify
- Axios
- JavaScript (ES6+)
- SCSS/CSS

## Project Structure

```
src/
├── components/
│   └── ResponsiveModal.vue
├── services/
│   └── api.js
├── plugins/
│   └── vuetify.js
├── App.vue
└── main.js
```

## Usage

- Click "Open Customer Selection" to launch the modal
- Use the search field to filter customers by ID or name
- Click "Start return" to select a customer
- Modal automatically adjusts to content while maintaining margins
- Customer names and cities truncate when space is insufficient

## Development

- Environment variables can be configured in `.env` files
- API endpoint configuration in `services/api.js`
- Component styling in scoped CSS section
- Vuetify configuration in `plugins/vuetify.js`

## Best Practices Implemented

- Component-based architecture
- Proper error handling
- Loading state management
- Responsive design principles
- Clean code structure
- Efficient data filtering
- Proper type checking
- Consistent naming conventions

## Deployment

- The project is deployed on Vercel at https://vue-responsive-modal.vercel.app/
