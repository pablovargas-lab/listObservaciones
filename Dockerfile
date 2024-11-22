# STEP 2 build a small nginx image with static website
FROM nginx:alpine

#COPY nginx-dev.conf /etc/nginx/nginx-dev.conf
COPY nginx.conf /etc/nginx/nginx.conf
#COPY nginx-prod.conf /etc/nginx/nginx-prod.conf

COPY run-nginx.sh /
RUN chmod +x run-nginx.sh
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

#RUN mkdir /usr/share/nginx/html/prod
#RUN mkdir /usr/share/nginx/html/dev
RUN mkdir /usr/share/nginx/html/app
## From 'builder' copy website to default nginx public folder
#COPY --from=builder /app-prod/dist /usr/share/nginx/html/prod
#COPY --from=builder /app-dev/dist /usr/share/nginx/html/dev
COPY /dist/sistema-de-recaudaciones /usr/share/nginx/html/app
EXPOSE 80
CMD ["/run-nginx.sh"]
