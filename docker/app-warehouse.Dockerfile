FROM node:14.5.0-alpine3.10

RUN mkdir -p /app-warehouse

WORKDIR /app-warehouse

COPY ./app-warehouse/package*.json ./
COPY ./app-warehouse/tsconfig.json ./

COPY ./app-warehouse/src .

RUN ls -a
RUN npm install



EXPOSE 3000

CMD ["npm", "run", "dev"]