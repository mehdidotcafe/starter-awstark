#!/bin/bash

filesToCopy=(
  "node_modules/.prisma/client/schema.prisma"
  "node_modules/.prisma/client/libquery_engine-debian-openssl-1.1.x.so.node"
  "node_modules/.prisma/client/libquery_engine-rhel-openssl-1.0.x.so.node"
)

# excute this command: "echo .aws-sam/build/*/" and store the result in destinations variable
destinations=( $(echo .aws-sam/build/*/ | xargs -n 1) )

xargs -n 1 cp -v  ${filesToCopy[@]}  <<< ${destinations[@]}
