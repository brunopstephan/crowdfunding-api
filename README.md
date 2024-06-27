# Crowdfunding API
- A pretend crowdfunding api with some trading rules, where you can create a account, open crowdfundings and receive deposits.

- This project was made mainly to learn about Docker/Postgres and improve my coding and solving problems skills.

## Setup

### Install dependencies

```bash
npm i
```

### Build Docker image and running it

This command will build the database docker image and up it, after this the database will be able to acept requests

```bash
npm run db:up
```

### Start the project

With the docker image builded and the container running, just type

```bash
npm run start
```
Or

```bash
npm run dev
```

For watch mode

After this you'll be able to see the logs in the terminal

![image](https://github.com/brunopstephan/crowdfunding-api/assets/101269702/6c4f98e9-5878-411a-ad3d-c62fb22f3d3c)


## Usage

- After started the project, access [http://localhost:9000/docs](http://localhost:9000/docs) and you must have access at the routes:

![image](https://github.com/brunopstephan/crowdfunding-api/assets/101269702/3e52027a-300b-45e7-b5d6-6875b5c1bbe8)
