FROM node:6.11.0-alpine

COPY yarn.lock package.json /opt/wao/
WORKDIR /opt/wao
RUN yarn install

CMD ["yarn", "run", "dev"]
