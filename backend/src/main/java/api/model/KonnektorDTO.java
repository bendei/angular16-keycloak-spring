package api.model;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import jakarta.annotation.Generated;

/**
 * KonnektorDTO
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2024-05-20T16:19:37.945907500+02:00[Europe/Budapest]")
public class KonnektorDTO {

  @JsonProperty("id")
  private Integer id;

  @JsonProperty("hostName")
  private String hostName;

  @JsonProperty("serialNumber")
  private String serialNumber;

  @JsonProperty("firmwareVersion")
  private String firmwareVersion;

  @JsonProperty("hardwareVersion")
  private String hardwareVersion;

  @JsonProperty("active")
  private Boolean active;

  @JsonProperty("created")
  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private java.time.LocalDateTime created;

  @JsonProperty("validUntil")
  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private java.time.LocalDateTime validUntil;

  @JsonProperty("auditlogs")
  @Valid
  private List<AuditLogDTO> auditlogs = null;

  public KonnektorDTO id(Integer id) {
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

  public KonnektorDTO hostName(String hostName) {
    this.hostName = hostName;
    return this;
  }

  /**
   * Get hostName
   * @return hostName
  */
  @NotNull 
  @Schema(name = "hostName", requiredMode = Schema.RequiredMode.REQUIRED)
  public String getHostName() {
    return hostName;
  }

  public void setHostName(String hostName) {
    this.hostName = hostName;
  }

  public KonnektorDTO serialNumber(String serialNumber) {
    this.serialNumber = serialNumber;
    return this;
  }

  /**
   * Get serialNumber
   * @return serialNumber
  */
  
  @Schema(name = "serialNumber", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  public String getSerialNumber() {
    return serialNumber;
  }

  public void setSerialNumber(String serialNumber) {
    this.serialNumber = serialNumber;
  }

  public KonnektorDTO firmwareVersion(String firmwareVersion) {
    this.firmwareVersion = firmwareVersion;
    return this;
  }

  /**
   * Get firmwareVersion
   * @return firmwareVersion
  */
  
  @Schema(name = "firmwareVersion", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  public String getFirmwareVersion() {
    return firmwareVersion;
  }

  public void setFirmwareVersion(String firmwareVersion) {
    this.firmwareVersion = firmwareVersion;
  }

  public KonnektorDTO hardwareVersion(String hardwareVersion) {
    this.hardwareVersion = hardwareVersion;
    return this;
  }

  /**
   * Get hardwareVersion
   * @return hardwareVersion
  */
  
  @Schema(name = "hardwareVersion", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  public String getHardwareVersion() {
    return hardwareVersion;
  }

  public void setHardwareVersion(String hardwareVersion) {
    this.hardwareVersion = hardwareVersion;
  }

  public KonnektorDTO active(Boolean active) {
    this.active = active;
    return this;
  }

  /**
   * Get active
   * @return active
  */
  
  @Schema(name = "active", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  public Boolean getActive() {
    return active;
  }

  public void setActive(Boolean active) {
    this.active = active;
  }

  public KonnektorDTO created(java.time.LocalDateTime created) {
    this.created = created;
    return this;
  }

  /**
   * Get created
   * @return created
  */
  @Valid 
  @Schema(name = "created", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  public java.time.LocalDateTime getCreated() {
    return created;
  }

  public void setCreated(java.time.LocalDateTime created) {
    this.created = created;
  }

  public KonnektorDTO validUntil(java.time.LocalDateTime validUntil) {
    this.validUntil = validUntil;
    return this;
  }

  /**
   * Get validUntil
   * @return validUntil
  */
  @Valid 
  @Schema(name = "validUntil", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  public java.time.LocalDateTime getValidUntil() {
    return validUntil;
  }

  public void setValidUntil(java.time.LocalDateTime validUntil) {
    this.validUntil = validUntil;
  }

  public KonnektorDTO auditlogs(List<AuditLogDTO> auditlogs) {
    this.auditlogs = auditlogs;
    return this;
  }

  public KonnektorDTO addAuditlogsItem(AuditLogDTO auditlogsItem) {
    if (this.auditlogs == null) {
      this.auditlogs = new ArrayList<>();
    }
    this.auditlogs.add(auditlogsItem);
    return this;
  }

  /**
   * Get auditlogs
   * @return auditlogs
  */
  @Valid 
  @Schema(name = "auditlogs", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  public List<AuditLogDTO> getAuditlogs() {
    return auditlogs;
  }

  public void setAuditlogs(List<AuditLogDTO> auditlogs) {
    this.auditlogs = auditlogs;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    KonnektorDTO konnektorDTO = (KonnektorDTO) o;
    return Objects.equals(this.id, konnektorDTO.id) &&
        Objects.equals(this.hostName, konnektorDTO.hostName) &&
        Objects.equals(this.serialNumber, konnektorDTO.serialNumber) &&
        Objects.equals(this.firmwareVersion, konnektorDTO.firmwareVersion) &&
        Objects.equals(this.hardwareVersion, konnektorDTO.hardwareVersion) &&
        Objects.equals(this.active, konnektorDTO.active) &&
        Objects.equals(this.created, konnektorDTO.created) &&
        Objects.equals(this.validUntil, konnektorDTO.validUntil) &&
        Objects.equals(this.auditlogs, konnektorDTO.auditlogs);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, hostName, serialNumber, firmwareVersion, hardwareVersion, active, created, validUntil, auditlogs);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class KonnektorDTO {\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    hostName: ").append(toIndentedString(hostName)).append("\n");
    sb.append("    serialNumber: ").append(toIndentedString(serialNumber)).append("\n");
    sb.append("    firmwareVersion: ").append(toIndentedString(firmwareVersion)).append("\n");
    sb.append("    hardwareVersion: ").append(toIndentedString(hardwareVersion)).append("\n");
    sb.append("    active: ").append(toIndentedString(active)).append("\n");
    sb.append("    created: ").append(toIndentedString(created)).append("\n");
    sb.append("    validUntil: ").append(toIndentedString(validUntil)).append("\n");
    sb.append("    auditlogs: ").append(toIndentedString(auditlogs)).append("\n");
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

