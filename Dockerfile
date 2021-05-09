FROM node:14

SHELL ["/bin/bash", "-c"]

RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
COPY packages/clients/package.json /app/packages/clients/package.json
COPY packages/handlers/package.json /app/packages/handlers/package.json
COPY packages/utils/package.json /app/packages/utils/package.json
COPY packages/webhooks/package.json /app/packages/webhooks/package.json

COPY lerna.json /app/lerna.json
RUN ["/bin/bash", "-c", "yarn install"]

# Bundle app source
COPY . /app
RUN ["/bin/bash", "-c", "yarn build"]

EXPOSE 8000
CMD [ "yarn", "start:webhooks:prod" ]