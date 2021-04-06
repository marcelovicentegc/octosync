FROM node:14 AS build
ENV NODE_ENV production
WORKDIR /app
ADD package.json package-lock.json /app/
RUN npm ci --dev
ADD . /app/
RUN npx tsc

FROM node:14
WORKDIR /app
ADD package.json package-lock.json /app/
RUN echo $'NODE_ENV=productionIRONMENT='$ENVIRONMENT >> .env && npm ci --prod
COPY --from=build /app/build/ /app/