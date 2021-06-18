FROM node:14.16.1-alpine

RUN apk --no-cache add curl

RUN curl -f https://get.pnpm.io/v6.js | node - add --global pnpm

WORKDIR /usr/src/app

COPY pnpm-lock.yaml ./
RUN pnpm fetch --prod

ADD . ./
RUN pnpm install -r --offline --prod

COPY . .

RUN pnpm build

CMD [ "pnpm", "start" ]
