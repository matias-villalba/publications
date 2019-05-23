FROM node:8.10.0
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY /scripts/wait-for-it.sh /opt/app/wait-for-it.sh
RUN chmod +x wait-for-it.sh
COPY package.json .
RUN npm i --silent
COPY serverless.yml .
RUN sed -i -e 's|${ssm:/${self:provider.stage}/publications/database/connection-uri}|postgres://publicationsuser:publicationspass@postgres-db:5432/publications|g' serverless.yml
COPY src ./src
EXPOSE 3000
CMD ["./node_modules/serverless/bin/serverless", "offline"]