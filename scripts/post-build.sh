#!/bin/bash
# prisma required files
filesToCopy=(
  "node_modules/.prisma/client/schema.prisma"
  "node_modules/.prisma/client/libquery_engine-debian-openssl-1.1.x.so.node"
  "node_modules/.prisma/client/libquery_engine-rhel-openssl-1.0.x.so.node"
)

# fetches all lambda function directories
rawDestinations=( $(echo .aws-sam/build/*/ | xargs -n 1) )

# add node_modules/.prisma/client/ to each lambda function directory (to make prisma work)
destinations=( $(for i in "${rawDestinations[@]}"; do echo "$i/node_modules/.prisma/client/"; done) )

# create prisma required sub-directories 
mkdir -p ${destinations[@]}

# copy prisma required files to each lambda function prisma sub-directory
xargs -n 1 cp -v  ${filesToCopy[@]}  <<< ${destinations[@]}
