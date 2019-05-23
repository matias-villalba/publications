FROM node:12.3.0-alpine
ENV PATH /app/node_modules/.bin:$PATH
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json .
RUN npm i --silent
COPY src ./src
COPY public ./public
EXPOSE 3000
# using api host-port: localhost:3000
CMD ["npm", "run", "start_local"]  