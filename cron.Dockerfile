FROM node:8
WORKDIR /usr/src/app

RUN mkdir core
RUN npm i mysql2 sequelize
COPY cron.js cron.js
COPY core/config.js core/config.js
COPY models models

CMD [ "node", "cron" ]