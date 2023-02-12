#!/bin/bash

filesToCopy=(
  "node_modules/.prisma/client/schema.prisma"
  "node_modules/.prisma/client/libquery_engine-debian-openssl-1.1.x.so.node"
  "node_modules/.prisma/client/libquery_engine-rhel-openssl-1.0.x.so.node"
)

# excute this command: "echo .aws-sam/build/*/" and store the result in destinations variable
rawDestinations=( $(echo .aws-sam/build/*/ | xargs -n 1) )

# add "node_modules/.prisma/client/" to each destination
destinations=( $(for i in "${rawDestinations[@]}"; do echo "$i/node_modules/.prisma/client/"; done) )

mkdir -p ${destinations[@]}

xargs -n 1 cp -v  ${filesToCopy[@]}  <<< ${destinations[@]}
