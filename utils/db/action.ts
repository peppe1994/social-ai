import { db } from "./dbConfig";
import { GeneratedContent, Subscriptions } from "./schema";
import { desc, eq, sql } from "drizzle-orm";

export async function getSubscriptionByUserId(userId: string) {
  const existingSubscription = await db
  .select()
  .from(Subscriptions)
  .where(eq(Subscriptions.userId, userId))
  .limit(1);

  if(!existingSubscription) {
    console.log("@@@@@@@NO SUBSCRIPTION ")
  }
  else {
    console.log("@@@@@@SUBSCRIPTION RETRIVIED: ", existingSubscription);
    return existingSubscription;
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
    }
  }
  
  export async function saveGeneratedContent(
    userId: string,
    content: string,
    prompt: string,
    contentType: string
  ) {
    try {
      const [savedContent] = await db
        .insert(GeneratedContent)
        .values({
          userId: sql`(SELECT id FROM ${Subscriptions} WHERE user_id = ${userId})`,
          content,
          prompt,
          contentType,
        })
        .returning()
        .execute();
      return savedContent;
    } catch (error) {
      console.error("Error saving generated content:", error);
      return null;
    }
  }
  
  export async function getGeneratedContentHistory(
    userId: string,
    limit: number = 10
  ) {
    try {
      const history = await db
        .select({
          id: GeneratedContent.id,
          content: GeneratedContent.content,
          prompt: GeneratedContent.prompt,
          contentType: GeneratedContent.contentType,
          createdAt: GeneratedContent.createdAt,
        })
        .from(GeneratedContent)
        .where(
          eq(
            GeneratedContent.userId,
            sql`(SELECT id FROM ${Subscriptions} WHERE user_id = ${userId})`
          )
        )
        .orderBy(desc(GeneratedContent.createdAt))
        .limit(limit)
        .execute();
      return history;
    } catch (error) {
      console.error("Error fetching generated content history:", error);
      return [];
    }
  }