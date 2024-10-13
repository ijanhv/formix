#!/bin/bash

# Variables
FONT_UTILS_PATH="./src/app/utils/font.ts"
TAILWIND_CONFIG_PATH="./tailwind.config.ts"
ROOT_LAYOUT_PATH="./src/app/layout.tsx"

# Input Parameters
IMPORT_NAME=$1        # e.g., Open_Sans
VARIABLE_NAME=$2      # e.g., openSans
WEIGHTS=$3            # e.g., "300 400 500 600 700"

# Check if all parameters are provided
if [ -z "$IMPORT_NAME" ] || [ -z "$VARIABLE_NAME" ] || [ -z "$WEIGHTS" ]; then
  echo "Usage: ./add-font.sh <ImportName> <VariableName> <Weights>"
  echo "Example: ./add-font.sh Open_Sans openSans '300 400 500 600 700'"
  exit 1
fi

# Prepare font import/export
FONT_IMPORT="import { $IMPORT_NAME } from \"next/font/google\";"
FONT_EXPORT="export const $VARIABLE_NAME = $IMPORT_NAME({
  subsets: [\"latin\"],
  variable: \"--font-$VARIABLE_NAME\",
  weight: [$(echo $WEIGHTS | sed 's/ /", "/g' | sed 's/^/"/' | sed 's/$/"/')],
});"

# Update font.ts
if ! grep -q "$FONT_IMPORT" "$FONT_UTILS_PATH"; then
  echo -e "$FONT_IMPORT\n$(cat $FONT_UTILS_PATH)" > $FONT_UTILS_PATH
fi

if ! grep -q "$VARIABLE_NAME" "$FONT_UTILS_PATH"; then
  echo -e "\n$FONT_EXPORT" >> $FONT_UTILS_PATH
fi

# Update Tailwind config
if ! grep -q "\"$VARIABLE_NAME\":" "$TAILWIND_CONFIG_PATH"; then
  sed -i.bak "s/fontFamily: {/fontFamily: {\n      $VARIABLE_NAME: [\"var(--font-$VARIABLE_NAME)\"],/" $TAILWIND_CONFIG_PATH
fi

# Update layout.tsx
if ! grep -q "$VARIABLE_NAME.variable" "$ROOT_LAYOUT_PATH"; then
  sed -i.bak "s/<main/<main className=\"\$\{$VARIABLE_NAME.variable\}\"/" "$ROOT_LAYOUT_PATH"
fi

# Success message
echo "Font $IMPORT_NAME has been successfully added!"
