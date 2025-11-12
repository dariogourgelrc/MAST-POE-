# Chief Christoffel – Project Changelog and Usage Notes

This document summarizes the implemented features, UI refactors, and navigation updates completed during this session, plus quick usage instructions.

## Changelog

- Price validation
  - Prevents negative prices in `app/add-item.tsx`.
  - Shows an error toast: “Price cannot be negative” and blocks submission.

- Navigation updates
  - Removed the “Add New Item to Guest View” button from Home (`app/index.tsx`).
  - Enabled the “Add New Item” tab in the bottom navigation (`app/_layout.tsx`).
  - Added a “Filter” tab to access the new filter-by-course screen.

- Reusable components
  - `components/CourseBadge.tsx`: Pill-style course label (`Starter`, `Main`, `Dessert`) with optional icon.
  - `components/MenuCard.tsx`: Unified card for menu items (name, price, description), optional course badge, selection indicator, and delete action.

- Screen refactors
  - Home (`app/index.tsx`): Render items using `MenuCard` for consistent UI.
  - Chose (`app/chose.tsx`): Replaced inline UI with `MenuCard`, preserving selection behavior.

- New screen: Filter by course
  - `app/filter.tsx` lists items by course with chips: `All`, `Starter`, `Main`, `Dessert`.
  - Uses `StorageService.getAllMenuItems()` and filters in-memory.
  - Renders with `MenuCard` and shows `CourseBadge` on each item.
  - Supports `?course=<Starter|Main|Dessert>` query param to preselect the filter.

- Home averages
  - Added “Average Price by Course” section on Home.
  - Computes per-course averages (`Starter`, `Main`, `Dessert`), ignores invalid/negative values, and formats as `R XX.XX`.

- Add Item – item management
  - Added a “Your Items” management section under the form (`app/add-item.tsx`).
  - Lists existing items using `MenuCard` with a delete action.
  - Delete flow includes confirmation, uses `StorageService.deleteMenuItem(id)` and shows success/error toasts.
  - Refreshes the list on add and when the screen regains focus.

## Storage API Used

- `StorageService.getAllMenuItems()` – load all items.
- `StorageService.saveMenuItem({...})` – add a new item.
- `StorageService.deleteMenuItem(id)` – delete a specific item.

## Run and Preview

- Start web preview:
  - `npx expo start --web --port 8082`
- Open in browser:
  - `http://localhost:8082/`

## How to Use

- Add Item tab
  - Fill in dish name, course, description, and price; negative prices are rejected.
  - Manage existing items in “Your Items”; use the trash icon to delete.

- Home tab
  - See all items rendered with consistent cards.
  - View “Average Price by Course” cards for Starter/Main/Dessert.

- Filter tab
  - Switch between `All`, `Starter`, `Main`, `Dessert` using chips.
  - Deep link support: `/filter?course=Starter` (or `Main`/`Dessert`).

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

Screen Optimization: Removed unnecessary screens to streamline the application flow.

General Adjustments: Performed various adjustments across different parts of the application.

🐛 Fixes & Polish
Feature Cleanup: Ensured everything is working correctly and removed or fixed any features that didn't make sense in the final application flow.

Final Polish: Added final features to the app to verify full operational status.
