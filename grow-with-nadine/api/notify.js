import crypto from "crypto";

export default async function handler(req, res) {

  // PayFast ONLY sends POST
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    // 🔥 Read raw body (required for PayFast)
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }

    const rawBody = Buffer.concat(buffers).toString();

    // Convert to object
    const data = Object.fromEntries(new URLSearchParams(rawBody));

    console.log("🔔 PayFast ITN Received:", data);

    // ✅ Always respond immediately (VERY IMPORTANT)
    res.status(200).send("OK");

    // ⬇️ Everything below runs AFTER response (non-blocking)

    // STEP 1: Build parameter string
    let pfParamString = "";

    Object.keys(data)
      .filter((key) => key !== "signature")
      .sort()
      .forEach((key) => {
        pfParamString += `${key}=${encodeURIComponent(data[key]).replace(
          /%20/g,
          "+"
        )}&`;
      });

    pfParamString = pfParamString.slice(0, -1);

    // STEP 2: Generate signature
    const generatedSignature = crypto
      .createHash("md5")
      .update(pfParamString)
      .digest("hex");

    // STEP 3: Compare signatures
    if (generatedSignature !== data.signature) {
      console.error("❌ Invalid signature");
      return; // 🔥 DO NOT break ITN
    }

    console.log("✅ Signature valid");

    // STEP 4: Validate with PayFast server
    const response = await fetch(
      "https://sandbox.payfast.co.za/eng/query/validate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: pfParamString,
      }
    );

    const result = await response.text();

    if (result !== "VALID") {
      console.error("❌ PayFast validation failed:", result);
      return;
    }

    console.log("✅ PayFast validation successful");

    // STEP 5: Check payment status
    if (data.payment_status === "COMPLETE") {

      console.log("💰 Payment COMPLETE");

      const paidAmount = parseFloat(data.amount_gross);
      console.log("Amount paid:", paidAmount);

      // 🔒 IMPORTANT: verify amount (add your logic here later)

      // ✅ TODO: Save order to database
      // ✅ TODO: Send confirmation message

    } else {
      console.log("⚠️ Payment not complete:", data.payment_status);
    }

  } catch (error) {
    console.error("❌ ITN Processing Error:", error);

    // 🔥 STILL return 200 to avoid cURL error
    return res.status(200).send("OK");
  }
}