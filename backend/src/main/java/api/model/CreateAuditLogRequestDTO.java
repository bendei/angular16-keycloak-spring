package api.model;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import jakarta.annotation.Generated;

/**
 * CreateAuditLogRequestDTO
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2024-05-20T16:19:37.945907500+02:00[Europe/Budapest]")
public class CreateAuditLogRequestDTO {

  @JsonProperty("user")
  private String user;

  @JsonProperty("userAction")
  private AuditLogMessageDTO userAction;

  @JsonProperty("konnektor")
  private Integer konnektor;

  public CreateAuditLogRequestDTO user(String user) {
    this.user = user;
    return this;
  }

  /**
   * Get user
   * @return user
  */
  @NotNull 
  @Schema(name = "user", requiredMode = Schema.RequiredMode.REQUIRED)
  public String getUser() {
    return user;
  }

  public void setUser(String user) {
    this.user = user;
  }

  public CreateAuditLogRequestDTO userAction(AuditLogMessageDTO userAction) {
    this.userAction = userAction;
    return this;
  }

  /**
   * Get userAction
   * @return userAction
  */
  @NotNull @Valid 
  @Schema(name = "userAction", requiredMode = Schema.RequiredMode.REQUIRED)
  public AuditLogMessageDTO getUserAction() {
    return userAction;
  }

  public void setUserAction(AuditLogMessageDTO userAction) {
    this.userAction = userAction;
  }

  public CreateAuditLogRequestDTO konnektor(Integer konnektor) {
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

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CreateAuditLogRequestDTO createAuditLogRequestDTO = (CreateAuditLogRequestDTO) o;
    return Objects.equals(this.user, createAuditLogRequestDTO.user) &&
        Objects.equals(this.userAction, createAuditLogRequestDTO.userAction) &&
        Objects.equals(this.konnektor, createAuditLogRequestDTO.konnektor);
  }

  @Override
  public int hashCode() {
    return Objects.hash(user, userAction, konnektor);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CreateAuditLogRequestDTO {\n");
    sb.append("    user: ").append(toIndentedString(user)).append("\n");
    sb.append("    userAction: ").append(toIndentedString(userAction)).append("\n");
    sb.append("    konnektor: ").append(toIndentedString(konnektor)).append("\n");
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

