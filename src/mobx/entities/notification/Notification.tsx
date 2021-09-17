import {
  types,
  SnapshotIn,
  Instance,
  SnapshotOut,
  IAnyType,
} from "mobx-state-tree";
import { DateTime } from "~/mobx/util-models/DateTime";

export interface NotificationInstance extends Instance<typeof Notification> {}
export interface NotificationSnapshotIn
  extends SnapshotIn<typeof Notification> {}
export interface NotificationSnapshotOut
  extends SnapshotOut<typeof Notification> {}

function nullable<T extends IAnyType>(type: T) {
  return types.optional(types.maybe(types.maybeNull(type)), undefined);
}

export const Notification = types.model("Notification", {
  notificationId: types.identifier,
  body: types.string,
  launchURL: nullable(types.string),
  additionalData: nullable(
    types.model("NotificationData", {
      id: types.string, // "9223d694-a33a-4219-a1bf-e477325d54cf",
      successful: types.number,
      converted: types.number,
      updated_at: DateTime,
      completed_at: DateTime,
      title: types.string,
      canceled: types.boolean,
      body: types.string,
      remaining: types.number,
      failed: types.number,
      finished: false,
      scheduled_at: DateTime,
      parent: nullable(
        types.model("NotificationParent", {
          type: types.string,
          id: types.string,
        })
      ),
      has_user_seen: false,
      created_at: DateTime,
    })

    // sound: nullable(types.string),
    // title: nullable(types.string),
    // rawPayload: types.string,
    // actionButtons   : object[],
  ),

  // // android only
  // groupKey: nullable(types.string),
  // groupMessage: nullable(types.string),
  // ledColor: nullable(types.string),
  // priority: nullable(types.number),
  // smallIcon: nullable(types.string),
  // largeIcon: nullable(types.string),
  // bigPicture: nullable(types.string),
  // collapseId: nullable(types.string),
  // fromProjectNumber: nullable(types.string),
  // smallIconAccentColor: nullable(types.string),
  // lockScreenVisibility: nullable(types.string),
  // androidNotificationId: nullable(types.number),

  // // ios only
  // badge: nullable(types.string),
  // badgeIncrement: nullable(types.string),
  // category: nullable(types.string),
  // threadId: nullable(types.string),
  // subtitle: nullable(types.string),
  // templateId: nullable(types.string),
  // templateName: nullable(types.string),
  // // attachments: ,
  // mutableContent: nullable(types.boolean),
  // contentAvailable: nullable(types.string),
});
