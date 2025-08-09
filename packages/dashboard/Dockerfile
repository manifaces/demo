FROM node:22-alpine AS build
ENV NODE_ENV production
USER node
WORKDIR /app

COPY --chown=node:node .yarn .yarn
COPY --chown=node:node package.json yarn.lock .yarnrc.yml ./
COPY --chown=node:node packages/dashboard/package.json packages/dashboard/
RUN yarn workspaces focus dashboard --production

COPY --chown=node:node packages/dashboard packages/dashboard
RUN yarn workspace dashboard build

FROM nginxinc/nginx-unprivileged:1.27 AS runtime
USER nginx

COPY --chown=nginx:nginx packages/dashboard/nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx --from=build /app/packages/dashboard/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
