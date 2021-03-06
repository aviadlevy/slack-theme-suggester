FROM node:10
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm install --only=production
# Bundle app source
COPY . .
EXPOSE ${PORT}
CMD [ "npm", "start" ]