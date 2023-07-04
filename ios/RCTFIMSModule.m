//
//  RCTFIMSModule.m
//  ItaliaApp
//
//  Created by Andrea.Piai on 03/07/23.
//

#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(FIMSModule, NSObject)
RCT_EXTERN_METHOD(
                  startFIMSFlow: (NSString *) url
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject
)
@end
