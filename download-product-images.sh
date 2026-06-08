#!/bin/zsh

set -u

mkdir -p images/products

rg -o 'https://www\.amazon\.co\.jp/dp/[A-Z0-9]+' products-data.js | sed 's#.*/##' | while IFS= read -r asin; do
  page="/tmp/amazon-${asin}.html"
  output="images/products/${asin}.jpg"

  curl -L -A 'Mozilla/5.0' -s "https://www.amazon.co.jp/dp/${asin}" -o "$page"
  image_url=$(rg -o 'data-old-hires="[^"]+' "$page" | head -1 | sed 's/data-old-hires="//')

  if [[ -z "$image_url" ]]; then
    image_url=$(rg -o '"hiRes":"[^"]+' "$page" | head -1 | sed 's/"hiRes":"//')
  fi

  if [[ -n "$image_url" ]]; then
    curl -L -A 'Mozilla/5.0' -s "$image_url" -o "$output"
    echo "saved $asin"
  else
    echo "missing $asin"
  fi
done
