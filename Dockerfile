FROM nginx:latest
ARG port
ENV PORT=$port
EXPOSE $PORT
WORKDIR /app

COPY /app /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
