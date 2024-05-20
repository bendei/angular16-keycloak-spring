package api.model;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.format.annotation.DateTimeFormat;
import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.media.Schema;


import jakarta.annotation.Generated;

/**
 * AuditLogDTO
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2024-05-20T16:19:37.945907500+02:00[Europe/Budapest]")
public class AuditLogDTO {

  @JsonProperty("id")
  private Integer id;

  @JsonProperty("user")
  private String user;

  @JsonProperty("konnektor")
  private Integer konnektor;

  @JsonProperty("userAction")
  private AuditLogMessageDTO userAction;

  @JsonProperty("timestamp")
  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private java.time.LocalDateTime timestamp;

  public AuditLogDTO id(Integer id) {
    this.id = id;
    return this;
  }

  /**
   * Get id
   * @return id
  */
  
  @Schema(name = "id", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public AuditLogDTO user(String user) {
    this.user = user;
    return this;
  }

  /**
   * Get user
   * @return user
  */
  
  @Schema(name = "user", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  public String getUser() {
    return user;
  }

  public void setUser(String user) {
    this.user = user;
  }

  public AuditLogDTO konnektor(Integer konnektor) {
    this.konnektor = konnektor;
    return this;
  }

  /**
   * Get konnektor
   * @return konnektor
  */
  
  @Schema(name = "konnektor", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  public Integer getKonnektor() {
    return konnektor;
  }

  public void setKonnektor(Integer konnektor) {
    this.konnektor = konnektor;
  }

  public AuditLogDTO userAction(AuditLogMessageDTO userAction) {
    this.userAction = userAction;
    return this;
  }

  /**
   * Get userAction
   * @return userAction
  */
  @Valid 
  @Schema(name = "userAction", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  public AuditLogMessageDTO getUserAction() {
    return userAction;
  }

  public void setUserAction(AuditLogMessageDTO userAction) {
    this.userAction = userAction;
  }

  public AuditLogDTO timestamp(java.time.LocalDateTime timestamp) {
    this.timestamp = timestamp;
    return this;
  }

  /**
   * Get timestamp
   * @return timestamp
  */
  @Valid 
  @Schema(name = "timestamp", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  public java.time.LocalDateTime getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(java.time.LocalDateTime timestamp) {
    this.timestamp = timestamp;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    AuditLogDTO auditLogDTO = (AuditLogDTO) o;
    return Objects.equals(this.id, auditLogDTO.id) &&
        Objects.equals(this.user, auditLogDTO.user) &&
        Objects.equals(this.konnektor, auditLogDTO.konnektor) &&
        Objects.equals(this.userAction, auditLogDTO.userAction) &&
        Objects.equals(this.timestamp, auditLogDTO.timestamp);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, user, konnektor, userAction, timestamp);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class AuditLogDTO {\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    user: ").append(toIndentedString(user)).append("\n");
    sb.append("    konnektor: ").append(toIndentedString(konnektor)).append("\n");
    sb.append("    userAction: ").append(toIndentedString(userAction)).append("\n");
    sb.append("    timestamp: ").append(toIndentedString(timestamp)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

