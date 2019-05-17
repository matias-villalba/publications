FROM node:8.10.0
RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm i
EXPOSE 3000
CMD ["node", "./node_modules/serverless/bin/serverless", "offline"]