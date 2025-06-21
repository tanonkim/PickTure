FROM node:alpine As development

RUN apk add --no-cache openssl3
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /usr/src/app

COPY package*.json ./

RUN pnpm install

COPY . .

RUN npx prisma generate --schema prisma/auth/schema.prisma

RUN pnpm build auth

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN pnpm install 

COPY --from=development /usr/src/app/prisma/auth        ./prisma/auth
COPY --from=development /usr/src/app/apps/auth/         ./apps/auth/
COPY --from=development /usr/src/app/libs               ./libs

RUN npx prisma generate --schema prisma/auth/schema.prisma

COPY --from=development /usr/src/app/dist ./dist

EXPOSE ${PORT}

CMD ["node", "dist/apps/auth/main"]