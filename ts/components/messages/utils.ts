import { CreatedMessageWithContentAndAttachments } from "../../../definitions/backend/CreatedMessageWithContentAndAttachments";
import { CreatedMessageWithContent } from "../../../definitions/backend/CreatedMessageWithContent";

export function hasAttachments(
  message: CreatedMessageWithContent | CreatedMessageWithContentAndAttachments
): message is CreatedMessageWithContentAndAttachments {
  return !!(message.content as any)?.attachments;
}

export function hasContent(
  message: CreatedMessageWithContent | CreatedMessageWithContentAndAttachments
): message is CreatedMessageWithContent {
  return !!(message.content as any)?.due_date;
}
