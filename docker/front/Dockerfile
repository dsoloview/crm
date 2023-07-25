FROM node:alpine

WORKDIR '/app'

COPY /front/package.json .

RUN npm install

COPY /front .

EXPOSE 5173

CMD ["npm", "run", "dev"]