FROM node:alpine
WORKDIR /var/www/renter-backend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "npm start"]
