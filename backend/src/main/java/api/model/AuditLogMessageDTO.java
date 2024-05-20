package api.model;

import com.fasterxml.jackson.annotation.JsonValue;


import jakarta.annotation.Generated;

import com.fasterxml.jackson.annotation.JsonCreator;

/**
 * Gets or Sets AuditLogMessageDTO
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2024-05-20T16:19:37.945907500+02:00[Europe/Budapest]")
public enum AuditLogMessageDTO {
  
  ADD_NEW_KONNEKTOR("ADD_NEW_KONNEKTOR"),
  
  REMOVE_KONNEKTOR("REMOVE_KONNEKTOR"),
  
  UPDATE_KONNEKTOR_SETTINGS("UPDATE_KONNEKTOR_SETTINGS"),
  
  USER_LOGIN("USER_LOGIN"),
  
  USER_LOGOUT("USER_LOGOUT"),
  
  CREATE_USER("CREATE_USER"),
  
  UPDATE_USER_DATA("UPDATE_USER_DATA"),
  
  DELETE_USER("DELETE_USER");

  private String value;

  AuditLogMessageDTO(String value) {
    this.value = value;
  }

  @JsonValue
  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  @JsonCreator
  public static AuditLogMessageDTO fromValue(String value) {
    for (AuditLogMessageDTO b : AuditLogMessageDTO.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }
}

