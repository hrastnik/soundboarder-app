export async function deepLinkSwitch(params: {
  url: string | null;
  onNoURL: () => any;
  onNoPath: () => any;
  default: () => any;
  /**
   * ChatRoom comment
   */
  onChatMessageReceived?: (chatRoomId: string, chatMessageId: string) => any;

  /**
   * New follower - redirect to the user that followed you
   */
  onFollower?: (userId: string) => any;

  /**
   * on Donation success
   */
  onDonation?: (donationId: string) => any;

  /**
   * Someone I follow adds a new product - redirect to the created product
   */
  onFollowerNewListing?: (productId: string) => any;

  /**
   * New community blog comment - new blog comment
   */
  onNewCommunityBlogComment?: (blogId: string) => any;

  /**
   * New Organization (nonprofit) blog comment - new blog comment
   */
  onNewOrganizationBlogComment?: (blogId: string) => any;

  /**
   * Someone left review to you
   */
  onNewReview?: (reviewId: string) => any;

  /**
   * Someone replied on your review of them
   */

  onReviewReply?: (sellerId: string) => any;

  /**
   * Seller gets offer from customer - redirect to offer screen
   * Customer gets "offer accepted" notification from seller - redirect to offer screen
   * Seller gets "offer deleted" notification from customer - redirect to offer screen
   * Customer gets "offer rejected" notification from seller - redirect to offer screen
   * Customer gets "new counter offer" notification - redirect to offer screen
   * Seller gets "accepted counter offer" notification - redirect to offer screen
   */
  onOfferAction?: (offerId: string) => any;

  /**
   * Order actions
   */
  onOrderAction?: (orderId: string) => any;
  onRequestForPurchase?: (productId: string) => any;
  onStripeConnect?: () => any;
  onStripeUpdate: () => any;
}) {
  if (!params.url) {
    return params.onNoURL();
  }

  const parsedURL = new URL(params.url);

  if (parsedURL.pathname === "") {
    if (params.onNoPath) return params.onNoPath();
  }

  const chatMessageReceivedRegex = /\/chat-rooms\/(.+)\/comments\/(.+)/;
  if (chatMessageReceivedRegex.test(parsedURL.pathname)) {
    const chatRoomId = parsedURL.href.match(chatMessageReceivedRegex)?.[1];
    const chatMessageId = parsedURL.href.match(chatMessageReceivedRegex)?.[2];
    if (params.onChatMessageReceived)
      return params.onChatMessageReceived(
        chatRoomId as string,
        chatMessageId as string
      );
  }

  const followerRegex = /\/followers\/(.+)/;
  if (followerRegex.test(parsedURL.pathname)) {
    const userId = parsedURL.href.match(followerRegex)?.[1];
    if (params.onFollower) return params.onFollower(userId as string);
  }

  const donationRegex = /\/donations\/(.+)/;
  if (donationRegex.test(parsedURL.pathname)) {
    const donationId = parsedURL.href.match(donationRegex)?.[1];
    if (params.onDonation) return params.onDonation(donationId as string);
  }

  const newFollowerListingRegex = /\/products\/(.+)/;
  if (newFollowerListingRegex.test(parsedURL.pathname)) {
    const productId = parsedURL.href.match(newFollowerListingRegex)?.[1];
    if (params.onFollowerNewListing)
      return params.onFollowerNewListing(productId as string);
  }

  const newOrganizationBlogCommentRegex = /\/blogs\/organizations\/(.+)/;
  if (newOrganizationBlogCommentRegex.test(parsedURL.pathname)) {
    const blogId = parsedURL.href.match(newOrganizationBlogCommentRegex)?.[1];
    if (params.onNewCommunityBlogComment)
      return params.onNewCommunityBlogComment(blogId as string);
  }

  const newCommunityBlogCommentRegex = /\/blogs\/users\/(.+)/;
  if (newCommunityBlogCommentRegex.test(parsedURL.pathname)) {
    const blogId = parsedURL.href.match(newCommunityBlogCommentRegex)?.[1];
    if (params.onNewOrganizationBlogComment)
      return params.onNewOrganizationBlogComment(blogId as string);
  }

  const newReviewRegex = /\/reviews\/(.+)/;
  if (newReviewRegex.test(parsedURL.pathname)) {
    const reviewId = parsedURL.href.match(newReviewRegex)?.[1];
    if (params.onNewReview) return params.onNewReview(reviewId as string);
  }

  const reviewReplyRegex = /\/user-review\/(.+)/;
  if (reviewReplyRegex.test(parsedURL.pathname)) {
    const sellerId = parsedURL.href.match(reviewReplyRegex)?.[1];
    if (params.onReviewReply) return params.onReviewReply(sellerId as string);
  }

  const newOfferFromCustomerRegex = /\/offers\/(.+)/;
  if (newOfferFromCustomerRegex.test(parsedURL.pathname)) {
    const offerId = parsedURL.href.match(newOfferFromCustomerRegex)?.[1];
    if (params.onOfferAction) return params.onOfferAction(offerId as string);
  }

  const orderRegex = /\/orders\/(.+)/;
  if (orderRegex.test(parsedURL.pathname)) {
    const orderId = parsedURL.href.match(orderRegex)?.[1];
    if (params.onOrderAction) return params.onOrderAction(orderId as string);
  }

  const requestPurchaseRegex = /\/purchase-request\/(.+)/;
  if (requestPurchaseRegex.test(parsedURL.pathname)) {
    const productId = parsedURL.href.match(requestPurchaseRegex)?.[1];
    if (params.onRequestForPurchase)
      return params.onRequestForPurchase(productId as string);
  }

  const stripeConnectRegex = /stripe-connect/;
  if (stripeConnectRegex.test(parsedURL.pathname)) {
    if (params.onStripeConnect) return params.onStripeConnect();
  }

  const stripeUpdateRegex = /stripe-update/;
  if (stripeUpdateRegex.test(parsedURL.pathname)) {
    if (params.onStripeUpdate) return params.onStripeUpdate();
  }

  params.default?.();
}
