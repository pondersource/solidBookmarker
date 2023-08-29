# build environment
FROM node:lts-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# FROM node:lts-alpine
# ENV NODE_ENV=production
# WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
# COPY . .
# EXPOSE 3000
# RUN chown -R node /usr/src/app
# USER node
# CMD ["npm", "start"]

# FROM node:lts-alpine
# ENV NODE_ENV=production
# WORKDIR /usr
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# COPY ["tsconfig.json","./"]
# COPY src ./src
# RUN ls -a
# RUN npm install
# RUN npm run build

# ## this is stage two , where the app actually runs
# FROM node:lts-alpine
# WORKDIR /usr
# COPY package.json ./
# RUN npm install --only=production
# COPY --from=0 /usr/dist .
# RUN npm install pm2 -g
# EXPOSE 8000
# CMD ["pm2-runtime","index.js"]