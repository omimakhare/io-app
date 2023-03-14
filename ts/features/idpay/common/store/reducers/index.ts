import { combineReducers } from "redux";
import initiativeDetailsReducer, {
  IDPayInitiativeState
} from "../../../initiative/details/store/index";
import unsubscriptionReducer, {
  IDPayUnsubscriptionState
} from "../../../unsubscription/store";
import walletReducer, {
  IDPayWalletState
} from "../../../wallet/store/reducers/index";

export type IDPayState = {
  wallet: IDPayWalletState;
  initiative: IDPayInitiativeState;
  unsubscription: IDPayUnsubscriptionState;
};

const idPayReducer = combineReducers({
  wallet: walletReducer,
  initiative: initiativeDetailsReducer,
  unsubscription: unsubscriptionReducer
});

export default idPayReducer;
