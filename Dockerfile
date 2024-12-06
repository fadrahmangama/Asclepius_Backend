FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV MODEL_URL='https://storage.googleapis.com/submissionmlgc-ml-asclepius/model.json'

CMD ["npm", "start"]
