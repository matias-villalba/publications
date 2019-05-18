FROM node:8.10.0
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json .
RUN npm i
COPY serverless.yml .
COPY src ./src
EXPOSE 3000
CMD ["node", "./node_modules/serverless/bin/serverless", "offline"]