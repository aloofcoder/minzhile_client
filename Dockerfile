FROM openresty/openresty
COPY dist/ /usr/local/openresty/nginx/html/
COPY nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
