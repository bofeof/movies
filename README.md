# Movies

[Movies](https://bofeof.nomoredomains.work) is an application where you can search and save your favorite movies. At this moment movies from Beat Film Festival are available for research. This app contains info-landing (available without auth) and the main part which includes working with movies (auth required)

[Movies frontend repo](https://github.com/bofeof/movies-explorer-frontend)
[Movies backend repo](https://github.com/bofeof/movies-explorer-api)

- Frontend: https://bofeof.nomoredomains.work
- Backend: https://api.bofeof-movies.nomoredomains.work/api
- Figma: https://www.figma.com/file/gtUKWXPuq72K8MHtAptK1r/Diploma-(Polina-Ch)?node-id=891%3A3857&t=Y1dyRhxLIZpRDX7H-0

[Demo of Movies](https://github.com/bofeof/movies-explorer-frontend/issues/25)

## Available functionality runs through the server:

### Standard functionality for users:

- Login and register with fail or successfull-info popup;
- Edit personal information: name, email;
- Working movies and save-movies sections: searching, filtering, saving, removing;
- 404 page;
- Available screen width for this app: from 320px to 1280px.

### Additional features for users I hope to implement in the future:

- ✅ Forms validator: login, register, edit user info;
- ✅ Submit-buttons control for all forms;
- ✅ Close popup by Esc-button;
- ✅ Classic and burger menu, it depends on screen width;
- ✅ Popups with error-messages.

- 🔜 Popup to display some additional information about movie

### How to run locally. All comands are located in package.json:

You need to change value of REACT_APP_BASE_URL (frontend/src/utils/constants.js)

- `npm install` Install all dependencies before start.
- `npm run build` Builds the app for production to the `build` folder.
- `npm run start` Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
