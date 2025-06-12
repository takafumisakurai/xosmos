// 1. Web SDK の設定
alloy("configure", {
    edgeConfigId: "f02971c1-8486-4544-9363-73dd8bd0e716",  // ← ここを置き換えてください
    propertyId: "YOUR_PROPERTY_ID"        // 必要に応じて
});

// 2. ボタン押下で FPID を取得
document.getElementById("checkFpid").addEventListener("click", () => {
    alloy("getIdentity")
        .then(identity => {
            // identity には identityMap や cookie 情報が含まれます
            document.getElementById("result").textContent = JSON.stringify(identity, null, 2);
        })
        .catch(err => {
            document.getElementById("result").textContent = "エラー: " + err.message;
        });
});