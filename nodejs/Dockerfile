FROM node:18-alpine

WORKDIR /usr/app

COPY ./*.js ./

RUN npm init -y
RUN npm install mysql2 --save

CMD [ "node","index.js" ]