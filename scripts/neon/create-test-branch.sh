NEON_TEST_BRANCH_NAME="test-$(date +%s)";

OUTPUT=${GITHUB_ENV:-/dev/stdout};

createdBranch=`curl --request POST \
     --url https://console.neon.tech/api/v2/projects/$NEON_PROJECT_ID/branches \
     --header 'accept: application/json' \
     --header "authorization: Bearer $NEON_API_KEY" \
     --header 'content-type: application/json' \
     --data "
{
  \"endpoints\": [
    {
      \"type\": \"read_write\"
    }
  ],
  \"branch\": {
    \"name\": \"$NEON_TEST_BRANCH_NAME\"
  }
}
"`;

branchId=`echo $createdBranch | jq -r '.branch.id'`;
branchHost=`echo $createdBranch | jq -r '.endpoints[0].host'`;

echo -e "NEON_TEST_BRANCH_ID=$branchId\nDB_HOST=$branchHost" > $OUTPUT;
