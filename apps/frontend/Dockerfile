FROM node:14.16.1-alpine as build

# RUN apk --no-cache add curl

# RUN curl -f https://get.pnpm.io/v6.js | node - add --global pnpm
RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY pnpm-lock.yaml ./
RUN pnpm fetch --prod

COPY . .

RUN pnpm install -r --offline --prod

RUN pnpm build

RUN pnpm build-storybook

# CMD [ "yarn", "start" ]

FROM nginx

COPY ./nginx /etc/nginx/

COPY --from=build /usr/src/app/dist /var/www/nameless.local/public
COPY --from=build /usr/src/app/storybook-static /var/www/storybook.nameless.local/public
