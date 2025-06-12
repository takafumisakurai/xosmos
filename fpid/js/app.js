// 1. Web SDK の設定（Edge Configuration ID のみ指定）
alloy("configure", {
  edgeConfigId: "f02971c1-8486-4544-9363-73dd8bd0e716"
});

// 2. ボタンクリックで sendEvent → getIdentity の順に実行
document.getElementById("checkFpid").addEventListener("click", () => {
  // sendEvent でリクエストを投げて初回クッキーを生成
  alloy("sendEvent", { xdm: {} })
    .then(() => {
      // 再度 ID を取得
      return alloy("getIdentity");
    })
    .then(identity => {
      document.getElementById("result").textContent =
        JSON.stringify(identity, null, 2);
    })
    .catch(err => {
      document.getElementById("result").textContent = "エラー: " + err.message;
    });
});
