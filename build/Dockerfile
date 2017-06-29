FROM node:6.11.0-alpine

COPY package.json src/ /opt/wao/
WORKDIR /opt/wao
RUN npm install --production

CMD ["yarn", "start"]
