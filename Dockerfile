FROM node:12

# Create App directory

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

ENV NODE_ENV=production
ENV PORT=5000
ENV PGUSER=postgres
ENV PGDATABASE=dbzbay
ENV PGHOST=db
ENV PGPORT=5432

EXPOSE 5000
CMD [ "npm", "run", "start" ]