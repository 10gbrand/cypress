FROM cypress/included:latest

WORKDIR /e2e

COPY package.json .
COPY cypress.config.js .
COPY cypress.env.json .
COPY cypress ./cypress

RUN npm install
RUN npm install --save-dev cypress-mochawesome-reporter

ENTRYPOINT ["npx", "cypress", "run"]

