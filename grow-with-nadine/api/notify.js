import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const data = req.body;

    console.log("🔔 PayFast ITN Received:", data);

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

    // STEP 2: Generate signature (NO PASSPHRASE for now)
    const generatedSignature = crypto
      .createHash("md5")
      .update(pfParamString)
      .digest("hex");

    // STEP 3: Compare signatures
    if (generatedSignature !== data.signature) {
      console.error("❌ Invalid signature");
      return res.status(400).send("Invalid signature");
    }

    console.log("✅ Signature valid");

    // STEP 4: Validate with PayFast server
    const validationUrl =
      "https://sandbox.payfast.co.za/eng/query/validate";

    const response = await fetch(validationUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: pfParamString,
    });

    const result = await response.text();

    if (result !== "VALID") {
      console.error("❌ PayFast validation failed:", result);
      return res.status(400).send("Validation failed");
    }

    console.log("✅ PayFast validation successful");

    // STEP 5: Check payment status
    if (data.payment_status === "COMPLETE") {
      console.log("💰 Payment COMPLETE");

      // 🔥 IMPORTANT: Verify amount
      const paidAmount = parseFloat(data.amount_gross);

      // TODO: Replace with real expected amount from your system
      // Example:
      // if (paidAmount !== expectedAmount) { reject }

      console.log("Amount paid:", paidAmount);

      // ✅ TODO: Save order to database (future step)

      // ✅ TODO: Send confirmation (WhatsApp / Email)

    } else {
      console.log("⚠️ Payment not complete:", data.payment_status);
    }

    return res.status(200).send("OK");
  } catch (error) {
    console.error("❌ Error processing ITN:", error);
    return res.status(500).send("Server error");
  }
}