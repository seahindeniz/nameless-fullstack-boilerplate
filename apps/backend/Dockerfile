FROM node:14.16.1-alpine

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY pnpm-lock.yaml ./
RUN pnpm fetch --prod

ADD . ./
RUN pnpm install -r --offline --prod

COPY . .

RUN pnpm build

CMD [ "pnpm", "start" ]
