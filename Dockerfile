FROM nginx
WORKDIR /app
COPY app /usr/share/nginx/html
EXPOSE 4200:80