FROM node:14

LABEL maintainer "Goye"

RUN mkdir -p /usr/app
COPY . /usr/app
WORKDIR /usr/app

RUN npm i --quiet

# Expose the app port
EXPOSE 3000

RUN npm install pm2 -g

# Start the app
CMD ["pm2-runtime", "index.js"]