FROM node:12

# Create App directory

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000
CMD [ "npm", "run", "start" ]