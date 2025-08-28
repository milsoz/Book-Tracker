1. Running the backend
   1.1. Enter the backend folder with cd backend
   1.2. Run npm i
   1.3. Run nodemon server.ts

2. Running the frontend
   1.1. Enter the frontend folder with cd frontend
   1.2. Run npm i
   1.3. Run npm start

⚠️ Note:
You may see moderate/high vulnerabilities related to `webpack-dev-server` when running `npm install` or `npm audit`.
These come from `react-scripts` (Create React App) and only affect the development server, not the production build.
There is currently no official fix. It is safe to ignore these for development/testing purposes.
