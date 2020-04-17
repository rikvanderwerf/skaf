#!/bin/sh
# wait-for-postgres.sh

set -e
  
host="$1"
shift
cmd="$@"
  
until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -c '\q'; do
  >&2 echo $POSTGRES_PASSWORD
  >&2 echo $POSTGRES_USER
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done
  
>&2 echo "Postgres is up - executing command"
exec $cmd
