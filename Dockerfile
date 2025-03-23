###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node serviceAccountKey.json ./

RUN npm ci

COPY --chown=node:node . .

# ✅ Generate Prisma Client
RUN npx prisma generate

USER node

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

# ✅ Generate Prisma Client again for safety
RUN npx prisma generate

RUN npm run build

RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

WORKDIR /usr/src/app

# ✅ Copy necessary files
COPY --chown=node:node --from=build /usr/src/app/serviceAccountKey.json ./
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma

# ✅ Generate Prisma Client again just in case
RUN npx prisma generate

CMD [ "node", "dist/main.js" ]
