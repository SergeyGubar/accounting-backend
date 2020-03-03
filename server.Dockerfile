FROM node:lts-alpine

WORKDIR /app
EXPOSE 80

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile && yarn cache clean

COPY . .

RUN npm run build

ARG GIT_COMMIT=unknown
ARG GIT_BRANCH=unknown

LABEL com.git.commit=${GIT_COMMIT}
LABEL com.git.branch=${GIT_BRANCH}

ENV PORT=80

ENV GIT_COMMIT=${GIT_COMMIT} GIT_BRANCH=${GIT_BRANCH}

EXPOSE 80

CMD [ "npm", "run", "start:prod" ]
