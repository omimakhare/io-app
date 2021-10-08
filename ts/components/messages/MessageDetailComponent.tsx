import { fromNullable } from "fp-ts/lib/Option";
import * as pot from "italia-ts-commons/lib/pot";
import { Content, H3, Text, View } from "native-base";
import DeviceInfo from "react-native-device-info";
import * as React from "react";
import { StyleSheet } from "react-native";

import { CreatedMessageWithContent } from "../../../definitions/backend/CreatedMessageWithContent";
import { CreatedMessageWithContentAndAttachments } from "../../../definitions/backend/CreatedMessageWithContentAndAttachments";
import { PrescriptionData } from "../../../definitions/backend/PrescriptionData";
import { ServicePublic } from "../../../definitions/backend/ServicePublic";
import I18n from "../../i18n";
import { ServiceMetadataState } from "../../store/reducers/content";
import { PaymentByRptIdState } from "../../store/reducers/entities/payments";
import variables from "../../theme/variables";
import {
  cleanMarkdownFromCTAs,
  paymentExpirationInfo
} from "../../utils/messages";
import OrganizationHeader from "../OrganizationHeader";
import MedicalPrescriptionAttachments from "./MedicalPrescriptionAttachments";
import MedicalPrescriptionDueDateBar from "./MedicalPrescriptionDueDateBar";
import MedicalPrescriptionIdentifiersComponent from "./MedicalPrescriptionIdentifiersComponent";
import MessageDetailCTABar from "./MessageDetailCTABar";
import MessageDetailData from "./MessageDetailData";
import MessageDueDateBar from "./MessageDueDateBar";
import MessageMarkdown from "./MessageMarkdown";
import { hasAttachments, hasContent } from "./utils";

type InputMessage =
  | CreatedMessageWithContent
  | CreatedMessageWithContentAndAttachments;

type Props = Readonly<{
  message: InputMessage;
  paymentsByRptId: PaymentByRptIdState;
  potServiceDetail: pot.Pot<ServicePublic, Error>;
  potServiceMetadata: ServiceMetadataState;
  onServiceLinkPress?: () => void;
}>;

type State = Readonly<{
  isContentLoadCompleted: boolean;
}>;

const styles = StyleSheet.create({
  padded: {
    paddingHorizontal: variables.contentPadding
  },
  serviceContainer: {
    marginBottom: variables.contentPadding
  },
  subjectContainer: {
    marginBottom: variables.spacerSmallHeight
  },
  ctaBarContainer: {
    backgroundColor: variables.brandGray,
    padding: variables.contentPadding,
    marginBottom: variables.contentPadding
  },
  webview: {
    marginLeft: variables.contentPadding,
    marginRight: variables.contentPadding
  },
  messageIDContainer: {
    width: "100%",
    alignContent: "space-between",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  messageIDLabelContainer: {
    flex: 1,
    height: variables.lineHeightBase,
    marginBottom: 5
  },
  messageIDBtnContainer: {
    flex: 0,
    marginBottom: 5,
    height: variables.lineHeightBase
  }
});

/**
 * A component to render the message detail. It has 2 main styles: traditional message and medical prescription
 */
export default class MessageDetailComponent extends React.PureComponent<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = { isContentLoadCompleted: false };
  }

  private onMarkdownLoadEnd = () => {
    this.setState({ isContentLoadCompleted: true });
  };

  get paymentExpirationInfo() {
    return paymentExpirationInfo(this.props.message);
  }

  get service() {
    const { potServiceDetail } = this.props;
    return fromNullable(
      pot.isNone(potServiceDetail)
        ? ({
            organization_name: I18n.t("messages.errorLoading.senderInfo"),
            department_name: I18n.t("messages.errorLoading.departmentInfo"),
            service_name: I18n.t("messages.errorLoading.serviceInfo")
          } as ServicePublic)
        : pot.toUndefined(potServiceDetail)
    );
  }

  get payment() {
    const { message, paymentsByRptId } = this.props;
    return this.service.fold(undefined, service => {
      if (message.content.payment_data !== undefined) {
        return paymentsByRptId[
          `${service.organization_fiscal_code}${message.content?.payment_data.notice_number}`
        ];
      }
      return undefined;
    });
  }

  private withMessageContent(
    message: InputMessage,
    render: (m: CreatedMessageWithContent) => React.ReactNode
  ): React.ReactNode {
    if (hasContent(message)) {
      return render(message);
    }
    return null;
  }

  public render() {
    const {
      message,
      potServiceDetail,
      potServiceMetadata,
      onServiceLinkPress
    } = this.props;
    const { service, payment } = this;

    const attachments = hasAttachments(message)
      ? message.content?.attachments
      : undefined;

    const medicalData: PrescriptionData | undefined =
      message.content.prescription_data;

    const title = medicalData ? (
      <H3>{message.content.subject}</H3>
    ) : (
      <React.Fragment>
        <H3>{I18n.t("messages.medical.prescription")}</H3>
        <Text>{I18n.t("messages.medical.memo")}</Text>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <Content noPadded={true}>
          {/** Header */}
          <View style={styles.padded}>
            <View spacer={true} />
            {service !== undefined && service.isSome() && (
              <React.Fragment>
                {service && <OrganizationHeader service={service.value} />}
                <View spacer={true} large={true} />
              </React.Fragment>
            )}
            {/* Subject */}
            {title}
            <View spacer={true} />
          </View>

          {medicalData && (
            <MedicalPrescriptionIdentifiersComponent
              prescriptionData={medicalData}
            />
          )}

          {this.withMessageContent(message, createdMessageWithContent =>
            medicalData ? (
              <MessageDueDateBar
                message={createdMessageWithContent}
                service={service.toUndefined()}
                payment={payment}
              />
            ) : (
              <MedicalPrescriptionDueDateBar
                message={createdMessageWithContent}
                service={service.toUndefined()}
              />
            )
          )}

          <MessageMarkdown
            webViewStyle={styles.webview}
            onLoadEnd={this.onMarkdownLoadEnd}
          >
            {cleanMarkdownFromCTAs(message.content.markdown)}
          </MessageMarkdown>

          <View spacer={true} large={true} />

          {attachments && this.state.isContentLoadCompleted && (
            <React.Fragment>
              <MedicalPrescriptionAttachments
                prescriptionData={medicalData}
                attachments={attachments}
                organizationName={this.service
                  .map(s => s.organization_name)
                  .toUndefined()}
              />
              <View spacer={true} large={true} />
            </React.Fragment>
          )}

          {this.state.isContentLoadCompleted &&
            this.withMessageContent(message, createdMessageWithContent => (
              <MessageDetailData
                message={createdMessageWithContent}
                serviceDetail={potServiceDetail}
                serviceMetadata={potServiceMetadata}
                goToServiceDetail={onServiceLinkPress}
              />
            ))}
        </Content>

        {DeviceInfo.hasNotch() && (
          <React.Fragment>
            <View spacer={true} large={true} />
            <View spacer={true} small={true} />
          </React.Fragment>
        )}

        {this.withMessageContent(message, createdMessageWithContent => (
          <MessageDetailCTABar
            message={createdMessageWithContent}
            service={service.toUndefined()}
            payment={this.payment}
          />
        ))}
      </React.Fragment>
    );
  }
}
