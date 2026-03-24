import crypto from "crypto";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    // 🔥 FIX: Read raw body manually
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }

    const rawBody = Buffer.concat(buffers).toString();

    // Convert URL-encoded string to object
    const data = Object.fromEntries(new URLSearchParams(rawBody));

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

    // STEP 2: Generate signature
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

    // STEP 4: Validate with PayFast
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
      return res.status(400).send("Validation failed");
    }

    console.log("✅ PayFast validation successful");

    // STEP 5: Check payment
    if (data.payment_status === "COMPLETE") {
      console.log("💰 Payment COMPLETE");

      const paidAmount = parseFloat(data.amount_gross);
      console.log("Amount paid:", paidAmount);

      // 👉 Save order here later
    }

    return res.status(200).send("OK");

  } catch (error) {
    console.error("❌ Error processing ITN:", error);
    return res.status(500).send("Server error");
  }
}