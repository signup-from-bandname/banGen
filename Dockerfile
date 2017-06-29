FROM node:6.11.0-alpine

COPY yarn.lock package.json /opt/bangen/
WORKDIR /opt/bangen
RUN yarn install

CMD ["yarn", "dev"]
