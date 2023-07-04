//
//  FIMSModule.swift
//  ItaliaApp
//
//  Created by Andrea.Piai on 03/07/23.
//

import Alamofire
import Foundation

@objc(FIMSModule)
class FIMSModule: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc public func startFIMSFlow(
    _ url: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) -> Void {
    resolve("From iOS with love")
  }
}
