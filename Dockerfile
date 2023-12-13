FROM node:18.19-slim

RUN mkdir -p /var/www/authentication

WORKDIR /var/www/authentication

COPY . .

RUN npm ci

EXPOSE 3000

CMD [ "npm", "start" ]
