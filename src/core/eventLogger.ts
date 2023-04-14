import Logger from "./logger";

export default class AppLogger {
  logError = (scope: string, message: string) => {
    Logger.error(`[Scope: ${scope} (${getLocationOfLogCaller()})] ${message}`);
  };

  logWarn = (scope: string, message: string) => {
    Logger.warn(`[Scope: ${scope} (${getLocationOfLogCaller()})] ${message}`);
  };

  logInfo = (scope: string, message: string) => {
    Logger.info(`[Scope: ${scope} (${getLocationOfLogCaller()})] ${message}`);
  };

  logDebug = (scope: string, message: string) => {
    Logger.debug(`[Scope: ${scope} (${getLocationOfLogCaller()})] ${message}`);
  };
}

function getLocationOfLogCaller() {
  let callLocation = new Error("").stack!.split("at ")[3].trim();
  const pathParts = callLocation.split("/");
  callLocation = pathParts[pathParts.length - 1];
  return callLocation;
}
