FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# This will download and build all of our packages inside of the build image where
# we have access to artifactory.
ADD package*.json /app/
RUN npm ci

ADD ./src /app/src
ADD ./angular.json /app/
ADD ./tsconfig.* /app/
RUN npx ng build --base-href "/${APP_BASE_HREF}/"

FROM nginx:1.18.0

ARG APP_BASE_HREF
ENV APP_BASE_HREF="${APP_BASE_HREF}"

WORKDIR /app

RUN echo "user:x:4200:4200:Unprivileged User::/bin/false" >> /etc/passwd

# Copy the nginx configuration files
COPY ./conf/nginx.conf /etc/nginx/nginx.conf

# Build default.conf file.
COPY ./conf/default.conf.jinja2 /etc/nginx/conf.d/default.conf.jinja2

RUN touch /app/nginx.pid
RUN chown -R 4200:4200 /var/cache/nginx /var/log/ /etc/nginx/conf.d /app/nginx.pid /usr/share/nginx/html

COPY --chown=4200 ./entrypoint.sh /app/
COPY --chown=4200 ./src/environment.js.jinja2 /app/

COPY --chown=4200 --from=build /usr/bin/j2tmpl  /usr/bin/j2tmpl
RUN j2tmpl /etc/nginx/conf.d/default.conf.jinja2 -o /etc/nginx/conf.d/default.conf
COPY --chown=4200 --from=build /app/dist /usr/share/nginx/html/${APP_BASE_HREF}

# Gzip Angular bundles to improve delivery speed.
# https://docs.nginx.com/nginx/admin-guide/web-server/compression#sending-compressed-files
RUN gzip -r -k -v9 /usr/share/nginx/html/${APP_BASE_HREF}

WORKDIR /usr/share/nginx/html
USER 4200

CMD ["/app/entrypoint.sh"]
