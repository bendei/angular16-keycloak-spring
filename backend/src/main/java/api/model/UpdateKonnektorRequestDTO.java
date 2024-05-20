package api.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.format.annotation.DateTimeFormat;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import jakarta.annotation.Generated;

/**
 * UpdateKonnektorRequestDTO
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2024-05-20T16:19:37.945907500+02:00[Europe/Budapest]")
public class UpdateKonnektorRequestDTO {

  @JsonProperty("konnektorId")
  private Long konnektorId;

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

  public UpdateKonnektorRequestDTO konnektorId(Long konnektorId) {
    this.konnektorId = konnektorId;
    return this;
  }

  /**
   * Get konnektorId
   * @return konnektorId
  */
  @NotNull 
  @Schema(name = "konnektorId", requiredMode = Schema.RequiredMode.REQUIRED)
  public Long getKonnektorId() {
    return konnektorId;
  }

  public void setKonnektorId(Long konnektorId) {
    this.konnektorId = konnektorId;
  }

  public UpdateKonnektorRequestDTO hostName(String hostName) {
    this.hostName = hostName;
    return this;
  }

  /**
   * Get hostName
   * @return hostName
  */
  
  @Schema(name = "hostName", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  public String getHostName() {
    return hostName;
  }

  public void setHostName(String hostName) {
    this.hostName = hostName;
  }

  public UpdateKonnektorRequestDTO serialNumber(String serialNumber) {
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

  public UpdateKonnektorRequestDTO firmwareVersion(String firmwareVersion) {
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

  public UpdateKonnektorRequestDTO hardwareVersion(String hardwareVersion) {
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

  public UpdateKonnektorRequestDTO active(Boolean active) {
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

  public UpdateKonnektorRequestDTO created(java.time.LocalDateTime created) {
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

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    UpdateKonnektorRequestDTO updateKonnektorRequestDTO = (UpdateKonnektorRequestDTO) o;
    return Objects.equals(this.konnektorId, updateKonnektorRequestDTO.konnektorId) &&
        Objects.equals(this.hostName, updateKonnektorRequestDTO.hostName) &&
        Objects.equals(this.serialNumber, updateKonnektorRequestDTO.serialNumber) &&
        Objects.equals(this.firmwareVersion, updateKonnektorRequestDTO.firmwareVersion) &&
        Objects.equals(this.hardwareVersion, updateKonnektorRequestDTO.hardwareVersion) &&
        Objects.equals(this.active, updateKonnektorRequestDTO.active) &&
        Objects.equals(this.created, updateKonnektorRequestDTO.created);
  }

  @Override
  public int hashCode() {
    return Objects.hash(konnektorId, hostName, serialNumber, firmwareVersion, hardwareVersion, active, created);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class UpdateKonnektorRequestDTO {\n");
    sb.append("    konnektorId: ").append(toIndentedString(konnektorId)).append("\n");
    sb.append("    hostName: ").append(toIndentedString(hostName)).append("\n");
    sb.append("    serialNumber: ").append(toIndentedString(serialNumber)).append("\n");
    sb.append("    firmwareVersion: ").append(toIndentedString(firmwareVersion)).append("\n");
    sb.append("    hardwareVersion: ").append(toIndentedString(hardwareVersion)).append("\n");
    sb.append("    active: ").append(toIndentedString(active)).append("\n");
    sb.append("    created: ").append(toIndentedString(created)).append("\n");
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

