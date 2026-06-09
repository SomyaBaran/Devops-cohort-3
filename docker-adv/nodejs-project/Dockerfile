# base image
# layer - 1
FROM node:22-alpine

# working directory 
# layer - 2
WORKDIR /app

COPY ./index.js ./index.js
COPY ./package.json ./package.json

# lets you copy the app directly from working directory
# layer - 3
COPY . .

# run a bunch of commands while the image is creating 
# layer - 4
RUN npm install
# RUN npm run build 

# exposed process port
EXPOSE 3000

# Final command that runs while running the container   
CMD ["node", "index.js"]


# NOTE: you can have multiple RUN but one CMD 


# anyone can pull it with --> docker pull somyabaran/hello-world-app