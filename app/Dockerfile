FROM node:latest

RUN mkdir /home/app
WORKDIR /home/app

RUN npm install -gq nodemon \
    fastify-cli

ENTRYPOINT ["npm", "run", "start:watch"]
