## Manual installation

- Install nodejs locally ()
- Clone the repo
- Install dependencies (npm install)
- Start the DB locally
  - docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
  - Go to neon.tech and get yourself a new DB
- Change the .env file and update your DB credentials
- npx prisma migrate dev (local)
- npx prisma migrate deploy (production)
- npx prisma generate
- npm run build
- npm run start

## Docker installation

- Install docker
- Start postgres (`docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres`)
- Build the image - `docker build --network=host -t user_project .`
- Start the image - `docker run -p 3000:3000 user_project`

## Docker compose installation

- Install docker, docker-compose
- Run `docker-compose up`
