# SYSTEM ARCHITECT MANUAL
**Status:** Active
**Context:** Feature-Based Modular React Application

## 1. ARCHITECTURAL PHILOSOPHY
This application follows a **Feature-Based Modular Architecture**. The codebase is organized by *domain* (what the code does) rather than *type* (components vs. hooks). 

**The Golden Rule:** 
> "Colocation over Abstraction." 
> Things that change together should stay together.

## 2. DIRECTORY STRUCTURE RULES

### Root Level
- **`src/features/`**: The core of the application. Every distinct business domain (Auth, Properties, People) gets its own folder here.
- **`src/components/`**: Only for *shared, generic* UI elements (Buttons, Inputs, Layouts) that are domain-agnostic.
- **`src/hooks/`**: Only for *global* utility hooks (e.g., `useTheme`). Feature-specific logic belongs in `features/[name]/hooks`.
- **`src/types/`**: Global type definitions used across multiple features.

### Feature Folder Structure
Every folder inside `src/features/[feature-name]/` must adhere to this pattern:
- `/components`: UI components specific to this feature.
- `/hooks`: State logic and data fetching specific to this feature.
- `/utils` (Optional): Helpers specific to this feature.
- `/types.ts` (Optional): Types specific to this feature.

## 3. CODING STANDARDS

### A. State Management
- **Never** clutter `App.tsx` or `Dashboard.tsx` with complex `useEffect` or `useState` logic.
- **Always** extract business logic into a custom hook (e.g., `useProperties.ts`, `useAuth.ts`).
- The UI components (`Dashboard.tsx`) should simply call the hook and render the data.

### B. Component Design
- **Presentation vs. Container:** Keep components "dumb" where possible. Pass data in via props.
- **Strict Typing:** All props and state must be typed. Avoid `any`.

### C. Import Paths
- Use relative paths within a feature (e.g., `../components/Button`).
- Use explicit relative paths for cross-feature imports (e.g., `../../components/ui/Input`).

## 4. PROTOCOL FOR NEW FEATURES

When adding a new feature (e.g., "Finance"), follow this strictly:

1.  **Create Folder:** `src/features/finance/`
2.  **Define Types:** Create `src/types/index.ts` updates or local types.
3.  **Build Logic:** Create `src/features/finance/hooks/useFinance.ts`.
4.  **Build UI:** Create components in `src/features/finance/components/`.
5.  **Integrate:** Import the hook and main component into `Dashboard.tsx`.

## 5. MAINTENANCE COMMANDMENTS
1.  **No Monoliths:** If a file exceeds 200 lines, ask yourself if it can be split.
2.  **Clean Tree:** Delete unused files immediately after refactoring.
3.  **Single Source of Truth:** This manual is the law. Update it if architectural patterns change.

## 6. CSS & STYLING
- Use **Tailwind CSS** for all styling.
- Maintain **Dark Mode** compatibility for every new component (`dark:` classes).
- Use `transition-colors duration-200` on backgrounds and text for smooth theme switching.
