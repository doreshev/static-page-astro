FROM node:lts-alpine AS runtime
WORKDIR /app

ADD . /app
RUN npm install
ENTRYPOINT ["npm", "run", "build"]