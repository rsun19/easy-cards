FROM node:lts-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 3000
# RUN chown -R node /usr/src/app
# USER node
CMD ["npm", "run", "dev"]
