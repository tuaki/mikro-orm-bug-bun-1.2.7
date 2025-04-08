FROM oven/bun:1.2.6

WORKDIR /app

# Because of react-email-preview (requires npm for building dev server)
COPY --from=node:22 /usr/local/bin/node /usr/local/bin/node

RUN apt-get update \
    && apt-get install -y supervisor cron \
    && apt-get clean

COPY docker/bun/supervisord.conf /etc/supervisord.conf

COPY docker/bun/docker-entrypoint.sh /

ENTRYPOINT ["/docker-entrypoint.sh"]
