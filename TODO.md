# Project TODO List

Last Updated: 2025-05-18

This file serves as a centralized place to track planned features, improvements, bug fixes, and other changes for the project. Use the checkboxes `[ ]` to mark tasks as incomplete and `[x]` to mark them as complete.

---

## 🚀 Planned Features & Enhancements

Major features or significant improvements that are scheduled or being actively worked on.

-   [ ] **[Priority: Low]** Share headshot gallery link.
    -   *Details:* Add a share button to the headshot gallery page.
    -   *Affected Areas:* apps/web/src/app/app/headshots/[id]/page.tsx

---

## 🐞 Bug Fixes

Known issues that need to be addressed.

-   [ ] **[Priority: High/Medium/Low]** Bug description.
    -   *Reported By:* (Optional) Who reported the bug?
    -   *Steps to Reproduce:* How can the bug be consistently triggered?
    -   *Affected Areas:* Where does the bug manifest?
    -   *Link:* (Optional) Link to bug report issue.

---

## 🔧 Refactoring & Improvements

Tasks related to code cleanup, performance optimization, technical debt reduction, etc.

-   [ ] **[Priority: Medium]** Refactor auth from apps/server to a separate package.
    -   *Details:* Refactor auth from apps/server to a separate package and use exports from it instead of using better-auth directly.

-   [ ] **[Priority: Medium]** Refactor trigger from apps/server to a separate package.
    -   *Details:* Refactor trigger from apps/server to a separate package and use exports from it instead of using trigger.dev directly.

-   [ ] **[Priority: Medium]** Refactor db from apps/server to a separate package.
    -   *Details:* Refactor db from apps/server to a separate package and use exports from it instead of using drizzle directly.

-   [ ] **[Priority: Medium]** Refactor email from apps/server to a separate package.
    -   *Details:* Refactor email from apps/server to a separate package and use exports from it instead of using resend and react-email directly.

---

## 🌱 Ideas & Backlog

Brainstorming area for potential future work that hasn't been prioritized yet.

-   Idea 1: Briefly describe the idea.
-   Idea 2: Another potential future task.
-   ...

---

## ✅ Completed

Tasks that have been finished. You can move items here temporarily before potentially removing them to keep the main sections clean. Include a completion date for reference.

-   [x] Create and test a trigger to delete unpaid headshots. (Completed On: 2025-05-17)
-   [x] Create and test a trigger to generate headshots. (Completed On: 2025-05-17)
-   [x] Write handler for payment completed webhook. (Completed On: 2025-05-18)