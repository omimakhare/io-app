import React from "react";
import { Animated, FlatList, StyleSheet, View } from "react-native";
import { ListRenderItemInfo } from "@shopify/flash-list";

import { MessageCategory } from "../../../../../definitions/backend/MessageCategory";
import { UIMessage } from "../../../../store/reducers/entities/messages/types";
import ItemSeparatorComponent from "../../../ItemSeparatorComponent";
import { ErrorLoadingComponent } from "../../ErrorLoadingComponent";
import MessageListItem from "./Item";
import customVariables from "../../../../theme/variables";

export const ITEM_HEIGHT = 114;
const ITEM_HEIGHT_WITH_SEPARATOR = ITEM_HEIGHT + 1;

type ItemLayout = {
  length: number;
  offset: number;
  index: number;
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: customVariables.contentPadding
  }
});

/**
 * Calculate the ItemLayout of a given index.
 */
export const generateItemLayout =
  (totalItems: number) =>
  (index: number): ItemLayout => ({
    length: index === totalItems ? ITEM_HEIGHT : ITEM_HEIGHT_WITH_SEPARATOR,
    offset: ITEM_HEIGHT_WITH_SEPARATOR * index,
    index
  });

export const ItemSeparator = () => <ItemSeparatorComponent noPadded={true} />;

export const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

type RenderItemProps = {
  hasPaidBadge: (id: MessageCategory) => boolean;
  onLongPress: (message: UIMessage) => void;
  onPress: (message: UIMessage) => void;
  selectedMessageIds?: ReadonlySet<string>;
};
export const renderItem =
  ({
    hasPaidBadge,
    onLongPress,
    onPress,
    selectedMessageIds
  }: RenderItemProps) =>
  ({ item: message }: ListRenderItemInfo<UIMessage>) =>
    (
      <View style={styles.itemContainer}>
        <MessageListItem
          category={message.category}
          hasPaidBadge={hasPaidBadge(message.category)}
          isRead={message.isRead}
          message={message}
          onPress={onPress}
          onLongPress={() => onLongPress(message)}
          isSelectionModeEnabled={!!selectedMessageIds}
          isSelected={!!selectedMessageIds?.has(message.id)}
        />
      </View>
    );

export type EmptyComponent = React.ComponentProps<
  typeof FlatList
>["ListEmptyComponent"];
type RenderEmptyListProps = {
  error?: string;
  EmptyComponent?: EmptyComponent;
};
export const renderEmptyList =
  ({ error, EmptyComponent }: RenderEmptyListProps) =>
  () => {
    if (error !== undefined) {
      return <ErrorLoadingComponent />;
    }
    if (EmptyComponent) {
      return <EmptyComponent />;
    }
    return null;
  };
