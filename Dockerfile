FROM nginx:alpine
ARG port
ENV PORT=$port
EXPOSE $PORT

COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /app
COPY /app /usr/share/nginx/html
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
# CMD ["nginx", "-g", "daemon off;"]


# FROM ubuntu:latest
# MAINTAINER Thiago Gabriel <tmoreirafreitas@gmail.com>

# RUN apt-get update
# RUN apt-get install -y nodejs
# RUN apt-get install -y npm
# RUN ln -s /usr/bin/nodejs /usr/bin/node

# RUN npm install -g http-server

# WORKDIR /app

# ARG port
# ENV PORT=$port
# EXPOSE $PORT

# CMD ["http-server", "-s"]