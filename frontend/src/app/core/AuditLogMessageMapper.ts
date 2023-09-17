import {AuditLogMessageDTO} from "../../../target/generated-sources/openapi";

export function mapToString(actionType: AuditLogMessageDTO): string {

  if (actionType == null) return "null";
  switch(actionType) {
    case "USER_LOGIN": return "User loggen in";
    break;
    case "USER_LOGOUT": return "User loggen out";
    break;
    case "CREATE_USER": return "user created";
    break;
    case "DELETE_USER": return "User deleted";
    break;
    case "ADD_NEW_KONNEKTOR": return "New konnektor added";
    break;
    case "REMOVE_KONNEKTOR": return "Konnektor removed";
    break;
    case "UPDATE_KONNEKTOR_SETTINGS": return "konnektor setting are updated";
    break;
    case "UPDATE_USER_DATA": return "User settings are updated";
    break;
    default: return "No constant found"
  }
}
