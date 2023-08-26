FROM node:18-alpine

WORKDIR /stock-sage-ui/

COPY public/ /stock-sage-ui/public
COPY src/ /stock-sage-ui/src
COPY package.json /stock-sage-ui/
COPY tailwind.config.js /stock-sage-ui/

RUN npm install

CMD ["npm", "start"]