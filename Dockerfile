FROM node:14 AS build
ENV NODE_ENV production
WORKDIR /app
ADD package.json yarn.lock /app/
RUN rm -rf node_modules && yarn install --frozen-lockfile --production=false
ADD . /app/
RUN yarn build

FROM build
WORKDIR /app
ADD package.json yarn.lock /app/
RUN rm -rf node_modules && yarn install --frozen-lockfile --prod
COPY --from=build /app/build/ /app/
EXPOSE 8000
CMD [ "node", "index.js" ]