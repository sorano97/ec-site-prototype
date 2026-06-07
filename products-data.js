const products = [
  { category: "防犯ブザー", anchor: "alarm", name: "エルパ(ELPA) Me'more 防犯アラーム AKB-01BK", price: "¥1,991", url: "https://www.amazon.co.jp/dp/B0GKLRSCWT" },
  { category: "防犯ブザー", name: "Hion 防犯ブザー USB充電式 TYPE-C LEDライト付き 防犯アラーム 黒", price: "Amazonで確認", url: "https://www.amazon.co.jp/dp/B0C5MVW7QR" },
  { category: "防犯ブザー", name: "防犯ブザー USB充電式 Type-Cアップグレード LEDライト付き ブルー", price: "¥949", url: "https://www.amazon.co.jp/dp/B09B9RBZ8Q" },
  { category: "防犯ブザー", name: "Hion 防犯ブザー 2個セット 黒+白 130dB LEDライト付き", price: "¥1,999", url: "https://www.amazon.co.jp/dp/B08ZNHD7PG" },
  { category: "防犯ブザー", name: "Hion 防犯ブザー USB充電式 振動感知警報・窓侵入防止 黒+白", price: "Amazonで確認", url: "https://www.amazon.co.jp/dp/B0CZ475T87" },
  { category: "防犯ブザー", name: "防犯ブザー 充電残量アラーム Type-C充電 1年持続モデル", price: "Amazonで確認", url: "https://www.amazon.co.jp/dp/B0DZ5KMNDT" },
  { category: "防犯ブザー", name: "夜歩き護身・窓侵入防止両用 防犯ブザー ブルー", price: "¥1,299", url: "https://www.amazon.co.jp/dp/B0C8DC5JYM" },
  { category: "防犯ブザー", name: "防犯ブザー 130dB LEDライト付き ブルー", price: "¥949", url: "https://www.amazon.co.jp/dp/B093D8PKG3" },
  { category: "防犯ブザー", name: "レイメイ藤井 防犯ブザー 生活防滴 ブルー EBB131A", price: "¥945", url: "https://www.amazon.co.jp/dp/B01871BJ2Q" },
  { category: "防犯ブザー", name: "アスカ プリンセス防犯ブザー ショコラ GE076ON", price: "Amazonで確認", url: "https://www.amazon.co.jp/dp/B0G5BQ2JYS" },
  { category: "防犯ブザー", name: "アスカ プリンセス防犯ブザー ポンポン GE084BE ベージュ", price: "Amazonで確認", url: "https://www.amazon.co.jp/dp/B0CLL9YHVR" },
  { category: "防犯ブザー", name: "TOKAIZ 防犯ブザー THG-SB01", price: "Amazonで確認", url: "https://www.amazon.co.jp/dp/B0DG5SS977" },
  { category: "防犯ブザー", name: "IPT 防犯ブザー ハート型 MSA-801", price: "Amazonで確認", url: "https://www.amazon.co.jp/dp/B08BNVHJ5J" },
  { category: "防犯ブザー", name: "ism 防犯ブザー ハート型 MSA-801-BK", price: "Amazonで確認", url: "https://www.amazon.co.jp/dp/B0C7GDLYVB" },
  { category: "防犯ブザー", name: "防犯ブザー 大音量125dB ハート型 LEDライト付き", price: "Amazonで確認", url: "https://www.amazon.co.jp/dp/B0G2YQ4THK" },
  { category: "防犯ブザー", name: "防犯ブザー 子ども・女の子向け ハート型 LEDライト付き", price: "Amazonで確認", url: "https://www.amazon.co.jp/dp/B0FMFPSB5X" },
  { category: "窓・ドア", anchor: "home", name: "スマアラーム 窓用防犯ブザー 2個入り ホワイト", price: "Amazonで確認", url: "https://www.amazon.co.jp/dp/B0G2L3BVNR" },
  { category: "窓・ドア", name: "防犯生活 振動センサー 防犯ドアアラーム 2個入り", price: "¥2,180", url: "https://www.amazon.co.jp/dp/B0DWM73Z1W" },
  { category: "窓・ドア", name: "防犯の女神 窓防犯アラーム 2個セット", price: "¥3,980", url: "https://www.amazon.co.jp/dp/B0G43C7LF5" },
  { category: "窓・ドア", name: "TOKAIZ 防犯アラーム 窓・ドア用 THG-SA02 2個入り", price: "¥1,880", url: "https://www.amazon.co.jp/dp/B0FQTPWD58" },
  { category: "窓・ドア", name: "アイリスオーヤマ リモコン付き窓用防犯アラーム 2個セット", price: "¥3,980", url: "https://www.amazon.co.jp/dp/B0GNZPQPM2" },
  { category: "窓・ドア", name: "エルパ 窓ピタッアラーム 衝撃＋開放検知式 2P", price: "Amazonで確認", url: "https://www.amazon.co.jp/dp/B0CP7K3SQN" },
  { category: "窓・ドア", name: "スマアラーム 窓用防犯ブザー 計6個 ブラック", price: "Amazonで確認", url: "https://www.amazon.co.jp/dp/B0G2LBV2W3" },
  { category: "ライト", anchor: "light", name: "Miflaier キーチェーンライト 防犯キーチェーン", price: "Amazonで確認", url: "https://www.amazon.co.jp/dp/B0GGXZ4G5D" },
  { category: "ライト", name: "LEDキーチェーンライト 小型懐中電灯 高輝度LED", price: "Amazonで確認", url: "https://www.amazon.co.jp/dp/B0F846PZ38" },
  { category: "カメラ・ドアベル", anchor: "camera", name: "シャオミ(Xiaomi) スマートカメラ C301", price: "¥3,638", url: "https://www.amazon.co.jp/dp/B0D7D7P84Q" },
  { category: "カメラ・ドアベル", name: "シャオミ(Xiaomi) スマートカメラ C302", price: "¥4,080", url: "https://www.amazon.co.jp/dp/B0FQPHHRNN" },
  { category: "カメラ・ドアベル", name: "TP-Link Tapo C200", price: "¥3,980", url: "https://www.amazon.co.jp/dp/B07YG7RNF2" },
  { category: "カメラ・ドアベル", name: "シャオミ(Xiaomi) ネットワークWi-Fiカメラ C500 Dual", price: "¥8,680", url: "https://www.amazon.co.jp/dp/B0DX2C3JCC" },
  { category: "カメラ・ドアベル", name: "Anker Eufy Indoor Cam C220", price: "Amazonで確認", url: "https://www.amazon.co.jp/dp/B0CQQQ5NZ1" },
  { category: "カメラ・ドアベル", name: "Aqara ワイヤレスカメラ付きドアベル G4", price: "¥15,840", url: "https://www.amazon.co.jp/dp/B0BPHTL7MG" },
];

const productCatalog = document.querySelector("#productCatalog");

if (productCatalog) {
  productCatalog.innerHTML = products.map((product) => {
    const asin = product.url.split("/dp/")[1];
    const imageVersion = ["B0GKLRSCWT", "B08BNVHJ5J", "B0C7GDLYVB"].includes(asin) ? "?v=2" : "";

    return `
      <article${product.anchor ? ` id="${product.anchor}"` : ""} class="catalog-card compact-card">
        <div class="product-slot product-slot-${asin}"><img src="/ec-site-prototype/images/products/${asin}.jpg${imageVersion}" alt="${product.name}" loading="lazy"></div>
        <p class="product-tag">${product.category}</p>
        <h2><a href="${product.url}" target="_blank" rel="sponsored noopener noreferrer">${product.name}</a></h2>
        <p class="product-price">${product.price}</p>
        <a class="text-link" href="${product.url}" target="_blank" rel="sponsored noopener noreferrer">商品ページへ</a>
      </article>
    `;
  }).join("");
}
