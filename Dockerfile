FROM node:8.12.0-alpine

RUN mkdir do

ADD . /node_demo
WORKDIR /node_demo
RUN npm install -g yarn
RUN yarn

EXPOSE 3000

CMD [ "node", "./bin/www" ]
