curl --request DELETE \
     --url https://console.neon.tech/api/v2/projects/$NEON_PROJECT_ID/branches/$NEON_TEST_BRANCH_ID \
     --header 'accept: application/json' \
     --header "authorization: Bearer $NEON_API_KEY" \
     --header 'content-type: application/json' > /dev/null;
