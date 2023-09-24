Project Members:
1) Dev Thakkar
2) Jonathan Dow
3) Rohan Sagar (rsagar@purdue.edu)
4) Dongwon Kim

Folder Structure:
src/ - contains all the source code  <br />
src/index.ts - entry point for the application  <br />
src/controllers/ - contains api logic  <br />
src/config/ - contains all environment variables, database connection, etc.  <br />
src/models/ - defines the interfaces for api  <br />
src/routes/ - contains all the routes  <br />
src/utils/ - all general purpose functions that can be used anywhere in the application  <br />
dist/ - contains all compiled javascript code  <br />
# Prettier is installed as a dev dependency. It will automatically format the code when you save a file. It will run automatically when `npm run dev` or `npm run start` is run. If you want to run it manually, run `npm run prettier-format`
## How to run the application
1) Clone the repository
2) Replace all empty env variables with the correct values
3) Run `npm install` to install all the dependencies
4) Run `npm run dev` to start the application in development mode (automatically restarts the server when changes are made - uses nodemon)
5) Run `npm run start` to start the application in production mode (does not restart the server when changes are made)


## License

This project is licensed under the [MIT License](LICENSE).