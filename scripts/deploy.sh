
#!/bin/bash

# Build the frontend
echo "Building frontend..."
npm run build

# Deploy to ICP
echo "Deploying to ICP..."
dfx deploy --yes

echo "Deployment completed!"
