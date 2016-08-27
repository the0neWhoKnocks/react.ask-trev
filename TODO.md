# To do

- [ ] Populate data
- [ ] Figure out global data storage solution.
  - Firebase
    - https://console.firebase.google.com/?pli=1
    - https://firebase.google.com/docs/web/setup
- [ ] Loading data
  - [ ] If online, load from Firebase
  - [ ] If offline, load from local DB
- [ ] Create admin that allows for managing questions/answers.
  - [ ] view - login screen when you hit the `/admin` path
    - [ ] in offline mode disable the admin path.
  - [ ] view - list of current Q&A's
    - Has a **Create Q&A** button
    - Clicking on a Q&A opens the Create/Edit view
  - [ ] view - Create/Edit
  - [ ] Save to exterior DB if online
  - [ ] Save to local DB if offline
    - [ ] Look into Service Workers for this
  - [ ] When loading data, do a diff with offline/online data. Set a date for
  each Q&A, diff those dates and prompt the user to choose which to keep so
  there are no unintended losses in data.
  - [ ] Create a hash for each QA item based on title so there are no duplicate
  items created.
- [ ] Add a toggle so the user can choose to be online/offline
  - [ ] Everytime the user goes online, store a local copy of the DB.
- [ ] When loading results, change the magnifying glass in the search input to
a loading spinner.
- [ ] Change images to SVG's
