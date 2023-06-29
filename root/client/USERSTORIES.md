Bug Tracking App User Stories

- [x] Home page with login
- [x] 'remember me' functionality to prevent refresh page from reseting privileges etc.
- [x] Welcome page upon login displays:
    - [x] Only projects assigned to an employee
    - [x] All Projects for manager
    - [x] All Projects and all users for admin

- [ ] Levels of privelege for different user types
    - [x] Admin 
        - [ ] create/delete user accounts, 
        - [x] all manager and employee privilege
    - [ ] Manager 
        - [ ] create projects 
        - [ ] add users to specific projects
        - [ ] re-assign tickets
        - [ ] create announcements (group message)
        - [ ] request removal of employees
        - [x] all employee privelege
    - [ ] Employee 
        - [ ] change statuses and add notes on thier own tickets
        - [ ] cannot close ticket without manager approval

- [x] Users are assigned projects and can switch between projects
- [x] Clicking a specific project displays tickets for the selected project with all information
- [x] Tickets are associated with a specific project when created
- [x] Tickets are assigned to specific users, and can only be reassigned by managers or admin
- [ ] Tickets can be maximized to there own page, where comments can be made and history viewed
- [x] Tickets have all relevant info (description, status, importance, creator, timestamps, project, etc.)
- [x] Tickets can be created, modified
- [x] Create ticket button floats over tickets page
- [x] Tickets can be closed/deleted (only deleted by managers after it has been closed)
- [x] Tickets can be sorted by categories from within the dashboard
- [x] Each data type will have a search option from its respective page (search tickets from project ticket, users from user settings, etc.)
- [ ] Each ticket will have a history, available before & after it is closed

- [x] Users have options to navigate to different pages from the dashboard via sidebar
    - [x] Tickets - this is where employees can view all tickets for their projects, managers can see what is assigned to everybody & make modifications
    - [x] Projects - Employees see their projects. Managers can modify who is working in each project
    - [x] Team members - employees see who they are working with & their assignments, managers can add/remove active members from projects, admin can add/remove users entirely
    - [ ] Profile - Users can customize various aspects of their profile, reset password etc
    - [ ] Settings - Users can change settings related to app functionality (font size, theme, notifications etc..)

- [x] Notification system available to each user type on the dashboard (click notification icon to open)
- [ ] Each user type will recieve different types/levels of notifications
    - [ ] Admin 
        - [ ] Requests to add/modify/remove employees
        - [x] password changes
        - [ ] server issues? invalid password attempts?
    - [ ] Manager 
        - [ ] Project related notifications
            - [ ] backlog (past due)
            - [ ] late tickets (missed deadline)
            - [ ] urgent status tickets
            - [ ] extension requests
        - [x] addition/modificaiton/removal of employees
    - [x] Employee 
        - [x] Due date reminders for assigned tickets
        - [x] new project & ticket assignments (addition and removal)
        
- [x] Once logged in users can navigate between pages, refresh and go back without losing privilege
- [ ] Users have the option to customize there profile and various settings of the app
    - [ ] change proile picture
    - [ ] change password
    - [ ] font (style, size)
    - [ ] theme (dark mode etc..)
    - [ ] certain notification options (add notification triggers on top of essentials)

- [ ] There will be demo users available for each privilege level to demonstrate different functionality
- [x] Users will be prompted to log in every 24 hours
- [x] Users can logout out

Nice to have:
- [ ] Different ways to display tickets on dashboard (list, grid, carousel, etc.)
- [ ] Profile pictures on users list
- [ ] Message boards for specific projects
- [ ] Users can customize profile and display preferences (e.g. dark mode, larger text, etc)

Extra feature ideas:
- [ ] Notifications are emailed to users
- [ ] See who is online/active
- [ ] Chat functionality between users
