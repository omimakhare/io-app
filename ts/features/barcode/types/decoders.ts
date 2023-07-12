import { NonEmptyString } from "@pagopa/ts-commons/lib/strings";
import * as A from "fp-ts/lib/Array";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";
import { DecodedIOBarcode } from "./IOBarcode";

// Barcode decoder function which is used to determine the type and content of a barcode
type IOBarcodeDecoderFn = (data: string) => O.Option<DecodedIOBarcode>;

type IOBarcodeDecodersType = {
  [K in DecodedIOBarcode["type"]]: IOBarcodeDecoderFn;
};

const decodeIdPayBarcode: IOBarcodeDecoderFn = (data: string) =>
  pipe(
    data.match(
      /^https:\/\/continua\.io\.pagopa\.it\/idpay\/auth\/([a-zA-Z0-9]{8})$/
    ),
    O.fromNullable,
    O.map(m => ({ type: "IDPAY", authUrl: m[0], trxCode: m[1] }))
  );

// Each type comes with its own decoded function which is used to identify the barcode content
// To add a new barcode type, add a new entry to this object
//
// Example:
//
// export const IOBarcodeDecoders: IOBarcodeDecodersType = {
//   IDPAY: decodeIdPayBarcode,
//   MY_NEW_BARCODE_TYPE: decodeMyNewBarcodeType
// };
export const IOBarcodeDecoders: IOBarcodeDecodersType = {
  IDPAY: decodeIdPayBarcode
};

/**
 * Returns the type of a barcode. Fallbacks to "UNKNOWN" if no type is found
 * @param value Barcode content
 * @returns DecodedIOBarcode {@see DecodedIOBarcode}
 */
export const decodeIOBarcode = (
  value: string | undefined
): O.Option<DecodedIOBarcode> =>
  pipe(
    value,
    O.fromNullable,
    O.map(NonEmptyString.decode),
    O.chain(O.fromEither),
    O.map(value =>
      Object.entries(IOBarcodeDecoders).map(([_, decode]) =>
        decode(value.trim())
      )
    ),
    O.map(A.compact),
    O.chain(A.head)
  );
