FROM node:14-alpine

# create app dirRUN mkdir /usr/src/app
WORKDIR /app

COPY . /app

# install deps
RUN npm install

RUN npm run build
EXPOSE 80

CMD npm run deploy
