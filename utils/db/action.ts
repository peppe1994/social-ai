import { db } from "./dbConfig";
import { Users, Subscriptions, GeneratedContent } from "./schema";
import { eq, sql } from "drizzle-orm";

export async function updateUserPoints(userId: string, points: number) {
    try {
      const [updatedUser] = await db
        .update(Users)
        .set({ points: sql`${Users.points} + ${points}` })
        .where(eq(Users.stripeCustomerId, userId))
        .returning()
        .execute();
      return updatedUser;
    } catch (error) {
      console.error("Error updating user points:", error);
      return null;
    }
  }

export async function createOrUpdateSubscription(
    userId: string,
    stripeSubscriptionId: string,
    plan: string,
    status: string,
    currentPeriodStart: Date,
    currentPeriodEnd: Date
  ) {
    try {
      const [user] = await db
        .select({ id: Users.id })
        .from(Users)
        .where(eq(Users.stripeCustomerId, userId))
        .limit(1);
  
      if (!user) {
        console.error(`No user found with stripeCustomerId: ${userId}`);
        return null;
      }
  
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
            userId: user.id,
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
  