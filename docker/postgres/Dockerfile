FROM postgres:15.1

COPY ./create_db.sh /docker-entrypoint-initdb.d/10-create_db.sh

RUN chmod +x /docker-entrypoint-initdb.d/10-create_db.sh