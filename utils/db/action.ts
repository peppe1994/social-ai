import { db } from "./dbConfig";
import { Subscriptions } from "./schema";
import { eq } from "drizzle-orm";

export async function createOrUpdateSubscription(
    userId: string,
    stripeSubscriptionId: string,
    plan: string,
    status: string,
    currentPeriodStart: Date,
    currentPeriodEnd: Date
  ) {
    try {
  
      const existingSubscription = await db
        .select()
        .from(Subscriptions)
        .where(eq(Subscriptions.stripeSubscriptionId, stripeSubscriptionId))
        .limit(1);
  
      let subscription;
      if (existingSubscription.length > 0) {
        // Update existing subscription
        [subscription] = await db
          .update(Subscriptions)
          .set({
            plan,
            status,
            currentPeriodStart,
            currentPeriodEnd,
          })
          .where(eq(Subscriptions.stripeSubscriptionId, stripeSubscriptionId))
          .returning()
          .execute();
      } else {
        [subscription] = await db
          .insert(Subscriptions)
          .values({
            userId: userId,
            stripeSubscriptionId,
            plan,
            status,
            currentPeriodStart,
            currentPeriodEnd,
          })
          .returning()
          .execute();
      }
  
      console.log("Subscription created or updated:", subscription);
      return subscription;
    } catch (error) {
      console.error("Error creating or updating subscription:", error);
      return null;
    }
  }
  