# FROM nginx
# COPY ./ /usr/share/nginx/html
# EXPOSE 5000:80
# CMD ["nginx", "-g", "daemon off;"]

# FROM nginx:latest
# COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
# COPY ./ /usr/share/nginx/html

FROM nginx:alpine
ARG port
ENV PORT=$port
EXPOSE $PORT
WORKDIR /app
COPY /app /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]