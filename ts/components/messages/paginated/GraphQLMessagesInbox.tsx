import { View } from "native-base";
import React, { useEffect } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";

import { constNull } from "fp-ts/lib/function";
import { TagEnum } from "../../../../definitions/backend/MessageCategoryBase";
import { PublicMessage } from "../../../../definitions/backend/PublicMessage";
import {
  Message,
  useMessagesQuery
} from "../../../../definitions/graphql/types";
import { RTron } from "../../../boot/configureStoreAndPersistor";
import I18n from "../../../i18n";
import { UIMessage } from "../../../store/reducers/entities/messages/types";
import { showToast } from "../../../utils/showToast";
import { EmptyListComponent } from "../EmptyListComponent";
import MessageListItem from "./MessageList/Item";

const styles = StyleSheet.create({
  listWrapper: {
    flex: 1
  },
  listContainer: {
    flex: 1
  }
});

type Props = {
  // navigateToMessageDetail: (message: UIMessage) => void;
  // archiveMessages: (messages: ReadonlyArray<UIMessage>) => void;
};

/**
 * Container for the message inbox.
 * It looks redundant at the moment but will be used later on once we bring back
 * states and filtering in the Messages.
 *
 * @param messages used for handling messages selection
 * @param navigateToMessageDetail
 * @param archiveMessages a function called when the user taps on the archive CTA
 * @constructor
 */
const GraphQLMessagesInbox = () => {
  const { data, loading, error } = useMessagesQuery({
    defaultOptions: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
      returnPartialData: true
    },
    variables: {
      pageSize: 3
    }
  });

  useEffect(() => {
    if (error) {
      RTron?.log(error);
      showToast(error.message, "danger");
    }

    if (data) {
      // showToast("Messages loaded", "success");
      RTron.log("Messages loaded", data);
    }
  }, [data, loading, error]);

  const ListEmptyComponent = () => (
    <EmptyListComponent
      image={require("../../../../img/messages/empty-message-list-icon.png")}
      title={I18n.t("messages.inbox.emptyMessage.title")}
      subtitle={I18n.t("messages.inbox.emptyMessage.subtitle")}
    />
  );

  return (
    <View style={styles.listWrapper}>
      <View style={styles.listContainer}>
        <FlatList
          data={data?.messages as ReadonlyArray<Message> | undefined}
          renderItem={({ item }: ListRenderItemInfo<Message>) => (
            <MessageListItem
              category={{ tag: TagEnum.GENERIC }}
              hasPaidBadge={false}
              isRead={true}
              message={{
                id: item.id as UIMessage["id"],
                serviceId: item.service?.service_id as UIMessage["serviceId"],
                serviceName: item.service
                  ?.service_id as UIMessage["serviceName"],
                title: item.content?.subject as UIMessage["title"],
                category: { tag: TagEnum.GENERIC },
                isRead: true,
                isArchived: false,
                organizationName: "disney",
                fiscalCode: "pippo" as UIMessage["fiscalCode"],
                createdAt: new Date(),
                raw: {
                  id: item.id as PublicMessage["id"],
                  fiscal_code: "pippo" as PublicMessage["fiscal_code"],
                  created_at: new Date(),
                  is_archived: false,
                  is_read: true,
                  sender_service_id: item.service
                    ?.service_id as PublicMessage["sender_service_id"],
                  time_to_live: 3600 as PublicMessage["time_to_live"],
                  service_name: "pippo",
                  organization_name: "pippo",
                  message_title: item.content?.subject ?? "title"
                } as PublicMessage
              }}
              onPress={constNull}
              onLongPress={() => constNull}
              isSelectionModeEnabled={false}
              isSelected={false}
            />
          )}
          keyExtractor={item => item.id}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
    </View>
  );
};

export default GraphQLMessagesInbox;
