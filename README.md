# Skiddle - Tech Task - Sam Fullen
The technical task for Skiddle, by Sam Fullen. The task took 4-5 hours to complete overall, including some tests on most of the components and mobile styling.

## Getting Started
### Prerequisites
- You must have a recent version of Node JS installed on your machine [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- You must also have npm installed on your machine [https://www.npmjs.com/get-npm](https://www.npmjs.com/get-npm)
- You must have git installed on your machine to clone the repository
### Clone the repository [https://github.com/Sfullen96/skiddle-tech-task](https://github.com/Sfullen96/skiddle-tech-task)
`git clone https://github.com/Sfullen96/skiddle-tech-task.git`
### Navigate into the folder
```
cd skiddle-tech-task
```
### Install the node modules
```
npm install
```
### Copy the contents of `.env.example` to `.env` & add a valid API key to REACT_APP_API_KEY
```
# Mac/Linux
cp .env.example .env

# Windows
Manually create a .env file in the root folder and copy the contents of .env.example into it
```
### Run the start script
```
npm run start
```
---
## Built With
- [React JS](https://reactjs.org/)
- [Create React App](https://github.com/facebook/create-react-app)
- HTML/CSS/Jsx
- [SASS](https://sass-lang.com/)
- [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/) (with react-bootstrap [node module](https://react-bootstrap.netlify.com/))
- [Jest](https://jestjs.io/)
- [Enzyme](https://github.com/airbnb/enzyme) - For shallow render testing and snapshot tests
- [ESLint](https://eslint.org/) - Using the prettier and AirBnb configs
- [Prettier](https://prettier.io/)
- [Prop Types](https://www.npmjs.com/package/prop-types)
---
## Directory Structure
- All source code can be found in the /src directory
- The /src/components holds all components
- `/src/__tests__` contains all tests
- `/src/constants` contains constant variables, such as the API endpoints so they could be used across the code without redefining
- `/src/helpers` contains the request helper which abstracts API request logic out of the components themselves
- `/src/services` contains the API calls to abstract them from the components to avoid clutter, also allows for resusability for making the same API call from multiple components
- `/src/Router.js` - Using React Router to allow navigation between routes
- `/src/index.js` - The applications entry point
- `/src/App.js` - The main component

## Running tests
- `npm run test`
- `npm run lint` to check there's no ESlint issues