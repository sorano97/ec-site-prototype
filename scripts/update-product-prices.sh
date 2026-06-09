#!/bin/zsh

set -u

script_dir=${0:A:h}
repo_root=${script_dir:h}
cd "$repo_root"

rg -o 'https://www\.amazon\.co\.jp/dp/[A-Z0-9]+' products-data.js | sed 's#.*/##' | while IFS= read -r asin; do
  page="/tmp/amazon-price-${asin}.html"
  curl -L -A 'Mozilla/5.0' -s "https://www.amazon.co.jp/dp/${asin}" -o "$page"
  price=$(rg -o '<span class="a-offscreen">[￥¥][0-9,]+' "$page" | head -1 | sed -E 's/.*>[￥¥]/¥/')

  if [[ -n "$price" ]]; then
    printf '%s\t%s\n' "$asin" "$price"
  else
    printf '%s\t%s\n' "$asin" "PRICE_NOT_FOUND"
  fi
done
