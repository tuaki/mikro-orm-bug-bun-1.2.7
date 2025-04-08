#!/bin/bash

echo "TEST BUILD"

# export NODE_OPTIONS=--openssl-legacy-provider

# TODO add --frozen-lockfile
bun install

# Commented so the db is consistent for migrations.
# bun cli db fresh-seed &

supervisord -c /etc/supervisord.conf
