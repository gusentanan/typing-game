<!-- Generated: 2025-07-19 18:16:00 UTC -->

# Typing Game

This is a web-based typing game built with React, TypeScript, and Vite. It fetches random quotes from an API and measures your typing speed (WPM) and accuracy as you type.

## Key Files & Directories

-   `src/main.tsx`: The main entry point where the React app is mounted.
-   `src/components/TypingGame.tsx`: The primary component that renders the game UI.
-   `src/hooks/useTypingGame.ts`: A custom hook containing all the core game logic.
-   `src/lib/quotes.ts`: A utility module for fetching quotes from the external API.
-   `vite.config.ts`: Configuration for the Vite development server and build process.

## Available Commands

-   `pnpm install`: Installs all project dependencies.
-   `pnpm run dev`: Starts the development server.
-   `pnpm run build`: Builds the application for production.
-   `pnpm run test`: Runs the unit tests for the project.
-   `pnpm run lint`: Lints the code to find and fix quality issues.

## React Patterns & Project Structure

This project uses modern React patterns to create a clean, maintainable, and testable application.

### 1. Custom Hooks for Logic Encapsulation

-   **File**: `src/hooks/useTypingGame.ts`
-   **Pattern**: Instead of putting all the logic inside the `TypingGame.tsx` component, we extracted it into a custom hook called `useTypingGame`.
-   **Benefit**: This separates the application's logic (the "how") from its presentation (the "what"). The `TypingGame` component doesn't need to know how the timer works or how WPM is calculated; it just uses the values and functions provided by the hook. This makes the UI component cleaner and the logic reusable and easier to test independently.

### 2. Component-Based Architecture

-   **Files**: `src/components/`
-   **Pattern**: The UI is broken down into small, single-purpose components like `GameResults.tsx`, and the UI library components in `ui/`.
-   **Benefit**: This is a fundamental concept in React. It makes the UI easier to manage, as each piece is self-contained. Data is passed down from parent to child components via `props` (e.g., `TypingGame` passes the final `wpm` and `accuracy` to `GameResults`).

### 3. Separation of Concerns (API Layer)

-   **File**: `src/lib/quotes.ts`
-   **Pattern**: The function responsible for fetching data from the network (`fetchQuote`) is in its own file.
-   **Benefit**: This decouples the application from the data source. If we wanted to change the quote API, we would only need to update this one file. It also prevents API-related code from cluttering our React components.

### 4. State and Side-Effect Management

-   **Hooks**: `useState` and `useEffect`
-   **Pattern**: Inside our `useTypingGame` hook, `useState` is used to manage all the data that can change over time (like `userInput`, `timeLeft`, `status`). `useEffect` is used to handle "side effects"—things that happen outside the normal component render, like setting up the countdown timer or recalculating stats when the user types.

### 5. Conditional Rendering

-   **File**: `src/components/TypingGame.tsx`
-   **Pattern**: The UI displays different elements based on the current `status` of the game. For example, the `GameResults` component is only shown when `status === 'finished'`.
-   **Benefit**: This makes the UI dynamic and responsive to the application's state without needing to create entirely different pages.