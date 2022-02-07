FROM nginx
WORKDIR /app
COPY app /usr/share/nginx/html
EXPOSE 5000