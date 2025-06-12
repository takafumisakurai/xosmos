alloy("configure", {
  edgeConfigId: "f02971c1-8486-4544-9363-73dd8bd0e716"
});

document.getElementById("checkFpid").addEventListener("click", async () => {
  try {
    console.log("▶ sendEvent 開始");
    const sendResp = await alloy("sendEvent", { xdm: {} });
    console.log("◀ sendEvent 完了／レスポンス:", sendResp);
    
    console.log("▶ getIdentity 開始");
    const idResp = await alloy("getIdentity");
    console.log("◀ getIdentity 完了／レスポンス:", idResp);
    
    document.getElementById("result").textContent = JSON.stringify(idResp, null, 2);
  } catch (e) {
    console.error("エラー発生:", e);
    document.getElementById("result").textContent = "エラー: " + e.message;
  }
});
