# SYSTEM INSTRUCTIONS: Modular Architecture Refactor

## 1. OBJECTIVE
Restructure the 'Real-estate-management-system' from a monolithic structure into a Feature-Based Modular Architecture. 

**CRITICAL RULE:** Do NOT change existing logic, variable names, or functionality. Only redistribute code into smaller, specific files to facilitate targeted editing.

## 2. TARGET DIRECTORY STRUCTURE
Move from a flat structure to the following:

/src
  /assets           <-- Images, icons, global styles
  /components
    /ui             <-- Generic, stateless components (Buttons, Inputs, Modals)
    /layout         <-- Shell, Navbar, Sidebar, Page wrappers
  /features         <-- THE CORE: Domain-specific folders
    /[feature-name] <-- e.g., properties, finance, tenants
      /components   <-- UI specific to THIS feature only
      /hooks        <-- Logic/State specific to THIS feature
      /services     <-- Feature-specific API/Storage logic
      /types.ts     <-- Local interfaces
      /index.ts     <-- Barrel export (The "Front Door")
  /hooks            <-- Global, reusable React hooks
  /services         <-- Global API configurations or utility services
  /types            <-- Global/Shared TypeScript definitions
  /utils            <-- Helper functions (date formatting, currency, etc.)



## 3. EDITING PROTOCOL FOR AI
To prevent full-file rewrites, Gemini must follow these rules:
1. **Partial Updates:** When asked to change a feature, only provide the code for the specific file within `/features/` or `/hooks/`.
2. **Hook Extraction:** If `App.tsx` contains state logic (useState, useEffect), move it to a custom hook in `src/features/hooks/`.
3. **No "Placeholder" Code:** Do not omit parts of the file unless specifically told to provide a "diff" only.
4. **Export Pattern:** Use named exports for all components to ensure better IDE autocomplete and AI tracking.

## 4. IMMEDIATE TASK
Analyze the current `App.tsx` and identify code blocks that belong in:
- `src/features/properties/`
- `src/features/finance/`
- `src/hooks/`

## 5. NEW FEATURE EXPANSION PROTOCOL
When asked to add a new feature (e.g., "Maintenance Requests" or "Reports"), Gemini must follow these steps in order:

1. **Schema First:** Define the TypeScript interfaces in `src/types/` or a local `types.ts` within the new feature folder.
2. **Logic Slice:** Create a custom hook (e.g., `useNewFeature.ts`) to handle the state, calculations, and data logic.
3. **UI Components:** Create small, focused components in `src/features/[feature-name]/components/`.
4. **Integration:** Only after the logic and UI are built, import the main feature component into the layout.

**CRITICAL:** Do NOT modify `App.tsx` logic to accommodate new features. Use the "Hooks" pattern to keep the main entry point clean.

## 6. ARCHITECTURAL AUTHORITY & FOLDER CREATION
- **Autonomy:** Gemini is authorized to create new sub-folders within `src/features/` or `src/components/` whenever a file exceeds 150 lines or when logic becomes distinct enough to warrant its own space.
- **Naming Convention:** Folders must be named in `kebab-case` (e.g., `payment-processing`) and should contain an `index.ts` to act as the "Front Door" (Barrel Export) for that folder.
- **Reporting:** When creating a new folder, Gemini must briefly explain *why* it is splitting the code (e.g., "Moving payment logic to a dedicated sub-folder for better isolation").

## 7. DOCUMENTATION MAINTENANCE
- **Living Document:** This md file must be updated whenever a new global service, utility pattern, or feature-grouping logic is introduced.
- **Change Log:** When providing an updated version of this guide, Gemini should include a brief "Change Log" at the bottom explaining what was added to the architecture.
- **Consistency Check:** Before generating any new code, Gemini should verify that the proposed file path aligns with Section 2 of this guide.


