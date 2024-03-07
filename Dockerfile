FROM node:hydrogen

WORKDIR /usr/src/app

COPY package*.json .
RUN npm ci

COPY . .

EXPOSE ${NODE_PORT}

CMD ["npm", "start"]
