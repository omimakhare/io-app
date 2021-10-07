import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { GlobalState } from "../../../../store/reducers/types";
import { CreditCardPaymentMethod } from "../../../../types/pagopa";
import BasePaymentMethodScreen from "../../common/BasePaymentMethodScreen";
import PaymentMethodFeatures from "../../component/features/PaymentMethodFeatures";
import CobadgeCard from "../component/CoBadgeCard";

type NavigationParams = Readonly<{
  CobadgeDetailScreen: {
    cobadge: CreditCardPaymentMethod;
  };
}>;

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  StackScreenProps<NavigationParams, "CobadgeDetailScreen">;

/**
 * Detail screen for a cobadge card
 * @constructor
 */
const CobadgeDetailScreen: React.FunctionComponent<Props> = props => {
  const cobadge: CreditCardPaymentMethod = props.route.params.cobadge;
  return (
    <BasePaymentMethodScreen
      paymentMethod={cobadge}
      card={<CobadgeCard enhancedCoBadge={cobadge} />}
      content={<PaymentMethodFeatures paymentMethod={cobadge} />}
    />
  );
};

const mapDispatchToProps = (_: Dispatch) => ({});

const mapStateToProps = (_: GlobalState) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CobadgeDetailScreen);
