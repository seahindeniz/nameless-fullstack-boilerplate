<div align="center">
  <img
    alt="Nameless logo"
    src="https://i.ibb.co/3rNQyJk/clown-5862845-min.png"
    height="140"
  />
  <h2 align="center">Nameless Fullstack Starter Kit</h2>
  <p align="center">A rich, full-stack boilerplate, built in TypeScript.</p>
  <p align="center">
    <a href="https://github.com/seahindeniz/nameless-fullstack-boilerplate/LICENSE.md">
      <img
        alt="License"
        src="https://img.shields.io/github/license/seahindeniz/nameless-fullstack-boilerplate?color=brightgreen&style=for-the-badge"
      />
    </a>
    <a
      href="https://github.com/seahindeniz/nameless-fullstack-boilerplate/actions"
    >
      <img
        alt="GitHub Actions"
        src="https://img.shields.io/github/workflow/status/seahindeniz/nameless-fullstack-boilerplate/Lint,%20Build%20&%20Test?style=for-the-badge"
        height="27"
      />
    </a>
    <a href="https://codecov.io/gh/seahindeniz/nameless-fullstack-boilerplate">
      <img
        alt="Codecov branch"
        src="https://img.shields.io/codecov/c/github/seahindeniz/nameless-fullstack-boilerplate/master.svg?style=for-the-badge"
      />
    </a>
  </p>
</div>

# Ingredients 👨‍🍳
## A rich, full-stack boilerplate, built in TypeScript
Project's stack list is divided into 3 lists

### Common
- 👨‍💼 Package Manager: [PNPM](https://pnpm.io/)
- 🔏 Type system: [TypeScript](https://www.typescriptlang.org/)
- 🧪 Test Runner: [Jest](https://jestjs.io/)
- 📈 Coverage reports: [Covecov](https://codecov.io/)
- 👕 Linter: [ESLint](https://eslint.org/)
- 💄 Formatter: [Prettier](https://prettier.io/)
- 🚢 Deployment: [Docker]()
- 📦 Continuous Integration: [GitHub Actions](https://github.com/features/actions/)
- 🔱 Reverse Proxy Server: [NGINX](https://www.nginx.com/)

### Backend
- ⏱ Runtime: [Node.js](https://nodejs.org/en/)
- 🖥 GraphQL, REST API and WebSocket Framework: [Fastify](https://www.fastify.io/)
- 🔀 Live communication: [WebSocket](https://github.com/websockets/ws)
- 🗃️ Database: [MongoDB](https://www.mongodb.com/)
- 🗃️ Database framework: [Mongoose](https://mongoosejs.com/) 
- 📝 REST API Documentation: [Swagger](https://swagger.io/tools/swagger-ui/)

### Frontend
- 🖼 UI Framework: [React](https://reactjs.org/)
- 🎨 CSS Framework: [Tailwind](https://tailwindcss.com/)
- 📝 UI Documentation: [Storybook](https://storybook.js.org/)
- 🔨 Bundler: [Webpack](https://webpack.js.org/)
- 👕 Style Linter: [Stylelint](https://stylelint.io/)

# Requirements
1. Node.js >= 12.22.0
2. Docker

> _Before getting started, make sure that Docker (Desktop) is running if you
  want to work locally, otherwise commands may fail, etc._

# Getting started
1. Use this repository as template or create a new repository by cloning
2. Visit [Codecov](https://docs.codecov.com/docs/quick-start#getting-started)
   and register your repo
3. Head to the repository Settings > [Secrets](./settings/secrets/actions) for
   registering your Codecov token
4. Add a new secret: `CODECOV_TOKEN`

## Run apps locally
1. Clone or use this repository as template
2. Install [pnpm](https://pnpm.io/installation)
   ([for obvious reasons](https://pnpm.io/motivation)):  
`npm install -g pnpm`
3. Install packages:  
`pnpm i`
4. Run apps:  
`pnpm dev`
   - Backend server will run at <http://localhost:3000/>
   - Frontend server will run at <http://localhost:3001/>

## Run apps on Docker
In the root folder, just run:  
`pnpm dock`
   - Backend server will run at <http://api.nameless.local/>
   - Frontend server will run at <http://nameless.local/>
   - Storybook server will run at <http://storybook.nameless.local/>

> Make sure to add the following host names to the host file to imitate domain
  names
  _([How to edit](https://phoenixnap.com/kb/how-to-edit-hosts-file-in-windows-mac-or-linux))_  
> 127.0.0.1		nameless.local  
> 127.0.0.1		api.nameless.local  
> 127.0.0.1		storybook.nameless.local

## Linting
Run ESLint with Prettier for static analysis and applying consistent code
formatting:   
`pnpm lint`

## Testing
This project consists of integration tests and unit tests upon the necessity of
requirements
Run Jest for running tests:   
`pnpm test`
