Bug Tracking App User Stories

- [ ] Home page with login & account registration
- [ ] Abilility for users to reset password & 'remember me'
- [ ] Levels of privelege for different user types
    - [ ] Admin - create/delete user accounts
    - [ ] Manager - create projects, add users to specific projects, re-assign tickets, create announcements, request addition/removal of employees
    - [ ] Employee - change statuses and add notes on tickets, cannot close ticket without manager approval
    - [ ] Demo - select user type and demonstrate priveleges without creating new account
- [ ] Dashboard upon login displaying tickets for the current project with condensed information
- [ ] Tickets are assigned to specific users, and can only be reassigned by managers or admin
- [ ] Tickets can be maximized to there own page, where comments can be made and history viewed
- [ ] Tickets have all relevant info (category, description, severity, importance, creator, date, etc.)
- [x] Tickets can be created, modified
- [ ] Tickets can be closed/deleted (only deleted by managers after it has been closed)
- [ ] Tickets can be sorted by categories from within the dashboard (e.g. sort by creator, assigned to, severity etc.)
- [ ] Each ticket will have a history, available before & after it is closed
- [ ] Users have options to navigate to different pages from the dashboard
    - [ ] Assignments - this is where employees can view what is assigned to them, managers can see what is assigned to everybody & make modifications
    - [ ] Projects - employees see the projects, description, possibly message board. Managers can modify who is working in each project
    - [ ] Team members - employees see who they are working with & their assignments, managers can request addition/removal, admin can add/remove
- [ ] There will be a notification system available to each user type on the dashboard
- [ ] Each user type will recieve different types/levels of notifications
    [ ] Admin - Requests to add/modify/remove employees & privelege, changes made to teams
    [ ] Manager - Project related notifications (backlog/late/urgent tickets etc)
    [ ] Employee - Reminders for assigned tickets, new ticket assignments, project announcements
    [ ] Demo - Same as privilege, example notifications for the selected user type
- [ ] Once logged in users can navigate between pages, refresh and go back without losing privilege
- [ ] Users will be prompted to log in every 24 hours
- [x] Users can logout out

Nice to have:
- [ ] Notifications are emailed to users
- [ ] Different ways to display tickets on dashboard (list, grid, carousel, etc.)
- [ ] See who is online/active
- [ ] Chat functionality between users.
- [ ] Message boards for specific projects
- [ ] Users can customize profile and display preferences (e.g. dark mode, larger text, etc)