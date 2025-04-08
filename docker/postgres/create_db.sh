#!/bin/bash
set -e

POSTGRES="psql --username ${POSTGRES_USER} -d ${POSTGRES_DB}"

echo "Creating test database"

$POSTGRES <<EOSQL
CREATE DATABASE ${POSTGRES_DB}_test OWNER ${POSTGRES_USER};
EOSQL