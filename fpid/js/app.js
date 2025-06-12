// 1. Web SDK の設定（Data Stream ID と Org ID を指定）
alloy("configure", {
  datastreamId: "f02971c1-8486-4544-9363-73dd8bd0e716",
  orgId:        "709F1DFC5B75373A0A495C41@AdobeOrg"
});

// 2. ボタン押下で sendEvent → getIdentity の順に実行
document.getElementById("checkFpid").addEventListener("click", async () => {
  try {
    console.log("▶ sendEvent 開始");
    await alloy("sendEvent", { xdm: {} });
    console.log("◀ sendEvent 完了");

    console.log("▶ getIdentity 開始");
    const idResp = await alloy("getIdentity");
    console.log("◀ getIdentity 完了／identityMap:", idResp.identity.identityMap);

    // 画面にも表示
    document.getElementById("result").textContent =
      JSON.stringify(idResp.identity.identityMap, null, 2);
  } catch (e) {
    console.error("エラー発生:", e);
    document.getElementById("result").textContent = "エラー: " + e.message;
  }
});
