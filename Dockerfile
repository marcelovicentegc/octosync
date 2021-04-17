FROM node:14 AS build
ENV NODE_ENV production
WORKDIR /app
ADD package.json yarn.lock /app/
RUN rm -rf node_modules && yarn install --frozen-lockfile
ADD . /app/
RUN yarn tsc

FROM node:14
WORKDIR /app
ADD package.json yarn.lock /app/
RUN rm -rf node_modules && yarn install --frozen-lockfile --prod
COPY --from=build /app/build/ /app/
EXPOSE 8000
CMD [ "node", "index.js" ]