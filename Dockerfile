# Primeira etapa para o backend
FROM node:20 AS backend

WORKDIR /app

COPY package.json .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]