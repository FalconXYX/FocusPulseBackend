#!/bin/bash

# This script builds the node-modules-layer, and should be run from
# the root of the repository (not from the `scripts` directory).

# Clean previous build
echo "Cleaning build directory."
rm -rf build

# Create required directory structure
# See: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html#configuration-layers-path
mkdir -p build/node-modules-layer/nodejs

# Copy package.json from project root
cp package.json build/node-modules-layer/nodejs

# Copy serverless-layers.yml into build directory.
cp serverless-layers.yml build/serverless.yml

# Install dependencies
echo "Installing dependencies..."
cd build/node-modules-layer/nodejs && npm install --omit=dev

echo "Finished building node-modules-layer."
