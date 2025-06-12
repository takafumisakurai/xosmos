// === 0. ユーティリティ関数 ===
// GUID v4 生成
function uuidv4() {
  // RFC4122 準拠の UUIDv4 を返す
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4))).toString(16)
  );
}

// Cookie 設定（days 日数で有効期限を設定）
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    expires = ";expires=" + d.toUTCString();
  }
  const secure = location.protocol === "https:" ? ";secure" : "";
  document.cookie = name + "=" + value + expires + ";path=/;samesite=lax" + secure;
}

// Cookie 取得
function getCookie(name) {
  const match = document.cookie.split("; ").find(c => c.startsWith(name + "="));
  return match ? match.split("=")[1] : null;
}

// === 1. FPID Cookie の発行／更新 ===
const datastreamId = "f02971c1-8486-4544-9363-73dd8bd0e716";
// UI で Cookie 名を「s_fpid」に変更している場合は下記。デフォルト名を使う場合はコメントアウトしてください。
// const cookieName = `__${datastreamId}_device_id`;
const cookieName = `s_fpid`;

let fpid = getCookie(cookieName);
if (!fpid) {
  // 未発行なら新規生成
  fpid = uuidv4();
  console.log("🚀 新規 FPID Cookie を設定:", fpid);
} else {
  console.log("🔄 既存 FPID Cookie を更新:", fpid);
}
// 有効期限を 5年（365日×5年）に延長
setCookie(cookieName, fpid, 365 * 5);

// === 2. Alloy の設定・初期フロー ===
alloy("configure", {
  datastreamId: "f02971c1-8486-4544-9363-73dd8bd0e716",
  orgId:        "709F1DFC5B75373A0A495C41@AdobeOrg"
});

// ページロード時に一度 sendEvent を投げる
alloy("sendEvent", { xdm: {} }).then(() => {
  console.log("初回 sendEvent 完了（FPID Cookie がここで発行される）");
});

document.getElementById("checkFpid").addEventListener("click", async () => {
  try {
    console.log("▶ sendEvent 開始");
    await alloy("sendEvent", { xdm: {} });
    console.log("◀ sendEvent 完了");

    console.log("▶ getIdentity 開始");
    const idResp = await alloy("getIdentity");
    console.log("◀ getIdentity 完了／identity:", idResp.identity);

    // 画面にも表示
    document.getElementById("result").textContent =
      JSON.stringify({
        cookieGenerated: fpid,
        identity: idResp.identity
      }, null, 2);
  } catch (e) {
    console.error("エラー発生:", e);
    document.getElementById("result").textContent = "エラー: " + e.message;
  }
});
