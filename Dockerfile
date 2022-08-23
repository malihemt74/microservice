FROM node:16
WORKDIR /usr/app
COPY package.json .
RUN npm
COPY . .
ENTRYPOINT ["npm", "start"]
