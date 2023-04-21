import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { usePnOpenConfirmationBottomSheet } from "../../../features/pn/components/PnOpenConfirmationBottomSheet";
import {
  AppParamsList,
  IOStackNavigationProp
} from "../../../navigation/params/AppParamsList";
import ROUTES from "../../../navigation/routes";
import { UIMessage } from "../../../store/reducers/entities/messages/types";

export const useMessageOpening = () => {
  const navigation = useNavigation<IOStackNavigationProp<AppParamsList>>();

  const navigate = useCallback(
    (message: UIMessage) => {
      navigation.navigate(ROUTES.MESSAGES_NAVIGATOR, {
        screen: ROUTES.MESSAGE_ROUTER_PAGINATED,
        params: {
          messageId: message.id,
          fromNotification: false
        }
      });
    },
    [navigation]
  );

  const pnBottomSheet = usePnOpenConfirmationBottomSheet({
    onConfirm: (message: UIMessage, _: boolean) => {
      navigate(message);
    }
  });

  const showAlertFor = useCallback(
    (message: UIMessage) => {
      if (message.hasPreconditions) {
        // show the bottomsheet if needed
        pnBottomSheet.present(message);
        return true;
      }
      return false;
    },
    [pnBottomSheet]
  );

  const openMessage = useCallback(
    (message: UIMessage) => {
      if (!showAlertFor(message)) {
        navigate(message);
      }
    },
    [navigate, showAlertFor]
  );

  return {
    openMessage,
    bottomSheet: pnBottomSheet.bottomSheet
  };
};
