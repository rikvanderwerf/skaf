from node:12
MAINTAINER Rik (rikvanderwerf@coderstudio.nl)

# Install dependencies
RUN apt-get update
RUN apt-get install -y postgresql-client

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000
CMD ["npm", "start"]



