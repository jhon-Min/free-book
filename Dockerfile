###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node serviceAccountKey.json ./

RUN npm ci

COPY --chown=node:node . .

# Run Prisma Generate before switching user
RUN npx prisma generate

USER node  # 🔹 Only switch to node user AFTER prisma generate

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node serviceAccountKey.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

ENV MY_VARIABLE=${MY_VARIABLE}

# Run Prisma Generate before switching user
RUN npx prisma generate

RUN npm run build
RUN npm ci --only=production && npm cache clean --force

USER node  # 🔹 Only switch to node user AFTER prisma generate

###################
# PRODUCTION
###################

FROM node:18-alpine As production

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/serviceAccountKey.json ./
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
