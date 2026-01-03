async function checkVPN() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();

    const ip = data.ip;
    const country = data.country_name;
    const org = data.org || "";
    
    const vpnKeywords = [
      "vpn",
      "proxy",
      "hosting",
      "cloud",
      "digitalocean",
      "aws",
      "google",
      "azure",
      "ovh"
    ];

    const isLikelyVPN = vpnKeywords.some(k =>
      org.toLowerCase().includes(k)
    );

    if (isLikelyVPN) {
      document.body.innerHTML = `
        <div style="
          height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          background:#0f172a;
          color:white;
          text-align:center;
          padding:20px;
        ">
          <div>
            <h2>⚠ VPN Detected</h2>
            <p>
              Kaaa sah! omo wereh😂, you're connecting from <b>${country}</b><br>
              IP Address: <b>${ip}</b>
            </p>
            <p>
               Turn off your VPN or proxy before i tear you slap 👋.
            </p>
            <button onclick="location.reload()"
              style="
                margin-top:15px;
                padding:10px 20px;
                border:none;
                border-radius:8px;
                background:#ff416c;
                color:white;
                font-size:16px;
              ">
              Retry
            </button>
          </div>
        </div>
      `;
    }

  } catch (err) {
    console.warn("VPN check failed", err);
  }
}