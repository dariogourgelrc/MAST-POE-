# Chief Christoffel – Project Changelog and Usage Notes

This document summarizes the implemented features, UI refactors, and navigation updates completed during this session, plus quick usage instructions.

## Changelog

- Price validation
  - Prevents negative prices in `app/add-item.tsx`.
  - Shows an error toast: “Price cannot be negative” and blocks submission.

- Navigation updates
  - Enabled the “Add New Item” tab in the bottom navigation (`app/_layout.tsx`).
  - Removed the Filter page and hid its tab to avoid duplicate functionality.

- Reusable components
  - `components/CourseBadge.tsx`: Pill-style course label (`Starter`, `Main`, `Dessert`) with optional icon.
  - `components/MenuCard.tsx`: Unified card for menu items (name, price, description), optional course badge, selection indicator, and delete action.

- Screen refactors
  - Home (`app/index.tsx`): Render items using `MenuCard` for consistent UI; delete is intentionally not available here.
  - Chose (`app/chose.tsx`): Uses `MenuCard` for item display and supports selection per course (Guest View).

- Home averages
  - Added “Average Price by Course” section on Home.
  - Computes per-course averages (`Starter`, `Main`, `Dessert`), ignores invalid/negative values, and formats as `R XX.XX`.

- Add Item – item management
  - Added a “Your Items” management section under the form (`app/add-item.tsx`).
  - Lists existing items using `MenuCard` with a delete action.
  - Delete flow includes confirmation, uses `StorageService.deleteMenuItem(id)` and shows success/error toasts.
  - Web-specific: uses `window.confirm` to ensure deletion works in browsers.
  - Refreshes the list on add and when the screen regains focus.

## Storage API Used

- `StorageService.getAllMenuItems()` – load all items.
- `StorageService.saveMenuItem({...})` – add a new item.
- `StorageService.deleteMenuItem(id)` – delete a specific item.

## Run and Preview

- Start web preview:
  - `npm run web -- --port 8082`
- Open in browser:
  - `http://localhost:8082/`

## How to Use

- Add Item tab
  - Fill in dish name, course, description, and price; negative prices are rejected.
  - Manage existing items in “Your Items”; use the trash icon to delete.
  - On web, confirm the deletion via browser prompt.

- Home tab
  - See all items rendered with consistent cards.
  - View “Average Price by Course” cards for Starter/Main/Dessert.
  - Deletion is not available on Home by design.

- Guest View (Menu → Choose Course)
  - Pick a course from `Guest View`, then select items in the `Chose` screen.

## Notes

- UI uses `Ionicons` for icons and toast messages via `react-native-toast-message` for feedback.
- Selection logic on the Chose screen is preserved and handled by `MenuCard`.

Features
Core Application Setup: Created all necessary screens for the application with basic, initial content.

Menu and Item Management: Implemented core menu features, including a dedicated "Add Item" button.

Persistent Storage: Introduced a storage mechanism to successfully save items.

UI Integration: Items saved in storage are now correctly displayed on both the Menu Screen and the Home Screen.

🛠️ Improvements & Adjustments
UI Refinement: Made general adjustments to the UI design for better aesthetics and usability.

Screen Optimization: Removed the Filter screen to streamline navigation and avoid duplication.

General Adjustments: Performed various adjustments across different parts of the application.

🐛 Fixes & Polish
Feature Cleanup: Ensured everything is working correctly and removed or fixed any features that didn't make sense in the final application flow.

Final Polish: Added final features to the app to verify full operational status.
