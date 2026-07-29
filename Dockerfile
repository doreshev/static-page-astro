FROM node:lts-alpine AS runtime
WORKDIR /app

ADD . /app
ENTRYPOINT ["npm", "install"]
CMD ["npm", "run", "build"]