FROM node:6.11.0-alpine

COPY package.json /opt/bangen/
COPY yarn.lock /opt/bangen/

WORKDIR /opt/bangen
RUN yarn --production

COPY src/ /opt/bangen/src/

EXPOSE 8008

CMD ["yarn", "start"]
