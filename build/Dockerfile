FROM node:6.11.0-alpine

COPY package.json src/ /opt/bangen/
WORKDIR /opt/bangen
RUN npm install --production

CMD ["yarn", "start"]
