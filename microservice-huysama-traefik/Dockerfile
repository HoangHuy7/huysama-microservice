FROM traefik:v3.4

USER root

# Dùng apk thay vì apt-get
RUN apk update && apk add ca-certificates && update-ca-certificates

# Copy minica.crt từ build context
COPY ./minica.pem /usr/local/share/ca-certificates/minica.crt

RUN update-ca-certificates

USER 1000
