# base image
FROM node:22-alpine

# working directory 
WORKDIR /app

COPY ./index.js ./index.js
COPY ./package.json ./package.json

# lets you copy the app directly from working directory
COPY . .

# run a bunch of commands while the image is creating 
RUN npm install
RUN npm run build 

# exposed process port
EXPOSE 3000

# the process that YOU are starting  
CMD ["node", "index.js"]


# NOTE: you can have multiple RUN but one CMD 