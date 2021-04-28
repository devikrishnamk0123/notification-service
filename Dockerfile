FROM node:12

ENV CI=true

WORKDIR /app
COPY package.json ./
RUN npm install
RUN npm run build
COPY ./ ./
EXPOSE 8000
CMD ["npm", "start"]