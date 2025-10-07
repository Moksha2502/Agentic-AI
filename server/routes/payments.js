import express from "express";
import User from "../models/User.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

// Mock: Create payment intent
router.post("/create-payment-intent", authenticateToken, async (req, res) => {
  try {
    const { plan, amount } = req.body;

    // Simulate a client secret
    const clientSecret = `mock_client_secret_${Date.now()}`;

    res.json({
      clientSecret,
      message: `Payment intent created for ${plan} at amount ${amount}`,
    });
  } catch (error) {
    console.error("Payment intent error:", error);
    res.status(500).json({ message: "Failed to create payment intent" });
  }
});

// Mock: Create subscription
router.post("/create-subscription", authenticateToken, async (req, res) => {
  try {
    const { plan } = req.body;
    const user = req.user;

    // Simulate subscription creation
    user.subscription.plan = plan;
    user.subscription.isActive = true;
    user.subscription.startDate = new Date();
    user.subscription.endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 1 month
    await user.save();

    res.json({
      subscriptionId: `mock_sub_${Date.now()}`,
      message: `Subscription created successfully for ${plan}`,
    });
  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).json({ message: "Failed to create subscription" });
  }
});

// Mock: Cancel subscription
router.post("/cancel-subscription", authenticateToken, async (req, res) => {
  try {
    const user = req.user;

    if (user.subscription.isActive) {
      user.subscription.isActive = false;
      await user.save();
    }

    res.json({ message: "Subscription cancelled successfully" });
  } catch (error) {
    console.error("Cancel subscription error:", error);
    res.status(500).json({ message: "Failed to cancel subscription" });
  }
});

export default router;
