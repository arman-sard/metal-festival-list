# Frontend Challenge: Metal Festival List

Welcome to the frontend challenge! In this task, your goal is to create a simple web page to list metal festivals using **React** and other libraries that are already set up.

## 🚀 Before You Start

**⚠ Important: Make sure you have node v20.18.0 installed and running before start!**

**⚠ Important: Do not fork this repository. Instead, follow these steps:**

1. **Clone the repository** to your local machine:

   ```bash
   git clone git@github.com:hypeIT-GmbH/hypeit-frontend-challenge.git
   ```

2. **Create a new repository** on your own GitHub account.
3. **Push your cloned project** to your new repository:

   ```bash
   git remote remove origin
   git remote add origin https://github.com/YOUR_USERNAME/NEW_REPOSITORY.git
   git push -u origin main
   ```

4. When finished, **share your repository link or send a ZIP file** of your solution.

## Requirements:

- **Before you begin**, check out the API response [here](https://zwctsaw30g.execute-api.eu-central-1.amazonaws.com/events).
- **Create a page** that displays a list of metal festivals.
- Include a **search bar** to filter festivals by name or other details.
- Display the festivals in **cards**, showing key details like e.g. the name, date, location, and image.
- When you **click a card** it should show more details for the festival.

## Libraries & Tools:

- **UI Library**: [Mantine](https://mantine.dev/) (for UI components)
- **Icons**: [FontAwesome](https://fontawesome.com/icons) (for icons)
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/) for unit tests
- **Translation**: [React-i18next](https://react.i18next.com/) for multi-language support
- **Query**: [TanStack Query](https://tanstack.com/query/latest) for data fetching
- **State Management**: Feel free to install [Redux Toolkit](https://redux-toolkit.js.org/) for managing global state (optional).

## Task:

1. **Fetch API**: You can find the API types in `src/api/generated/apiSchemas` and a hook (`useQueryFestivals`) in `src/api/generated/apiComponents` utilizing TanStack Query set up for you to query the API endpoint for the festival data.
2. **Festival List**: Create a page where a list of festivals is displayed in cards. Each card should show:
   - Name of the festival
   - Date of the festival
   - Location of the festival
3. **Search Bar**: Add a search bar that filters the festivals by name or other details dynamically.
4. **Testing**: Write **at least one unit test** to test a feature of your choice (e.g., component, helper function, custom hook).
5. **Custom Hook**: Write a **custom hook** that could be used to manage the state of the festival list (e.g., filtering the list or fetching data from an API).
6. **Helper Function**: Write a **helper function** that does something useful in the context of the festival list (e.g., formatting dates, transforming data, etc.).

## Scope:

This challenge should take **about 4 hours** to complete. Don't worry if you don’t finish everything—focus on giving us insight into how you work.

## Submission:

Please submit your solution in the form of a GitHub repository link or a ZIP file.

Good luck, and have fun! 🍀

## Development:

Install the dependencies:

```bash
npm ci
```

## Get started

Start the dev server:

```bash
npm run dev
```

Run the tests:

```bash
npm run test:watch
```

### Alternative Package Management (Yarn)

This implementation uses Yarn as an alternative package manager. You can also use these commands:

```bash
# Install dependencies
yarn

# Start the development server
yarn dev

# Run tests
yarn test:watch
```
