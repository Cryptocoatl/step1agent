
#!/bin/bash

# Define colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Print banner
echo -e "${GREEN}===================================${NC}"
echo -e "${GREEN}    Digital ID Deploy Script       ${NC}"
echo -e "${GREEN}===================================${NC}"

# Check if dfx is installed
if ! command -v dfx &> /dev/null; then
    echo -e "${YELLOW}dfx could not be found. Please install the Internet Computer SDK${NC}"
    exit 1
fi

# Build the frontend
echo -e "${GREEN}Building frontend...${NC}"
npm run build

# Start local replica in background if not already running and if we're in local mode
if [ "$1" != "ic" ]; then
    echo -e "${GREEN}Starting local replica (if not already running)...${NC}"
    dfx start --background

    # Wait a moment for the replica to start
    sleep 5
fi

# Deploy the canisters
echo -e "${GREEN}Deploying to ${1:-local} network...${NC}"
if [ "$1" == "ic" ]; then
    dfx deploy --network ic --yes
else
    dfx deploy --yes
fi

# Print success message with canister information
echo -e "${GREEN}Deployment completed!${NC}"

# Display canister IDs and URLs
echo -e "${YELLOW}Canister IDs:${NC}"
dfx canister id backend
dfx canister id digital_identity_manager
dfx canister id frontend

# Display frontend URL
if [ "$1" == "ic" ]; then
    FRONTEND_ID=$(dfx canister id frontend --network ic)
    echo -e "${YELLOW}Frontend URL:${NC} https://${FRONTEND_ID}.icp0.io"
else
    FRONTEND_ID=$(dfx canister id frontend)
    echo -e "${YELLOW}Frontend URL:${NC} http://localhost:8080/"
    echo -e "${YELLOW}Local canister URL:${NC} http://localhost:4943/?canisterId=${FRONTEND_ID}"
fi

echo -e "${GREEN}===================================${NC}"
