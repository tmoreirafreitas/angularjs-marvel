FROM nginx:alpine
ARG port
ENV PORT=$port
EXPOSE $PORT

COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /app
COPY /app /usr/share/nginx/html
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'