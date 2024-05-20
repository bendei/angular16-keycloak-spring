package api.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import jakarta.annotation.Generated;

/**
 * KonnektorHostnameDTO
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2024-05-20T16:19:37.945907500+02:00[Europe/Budapest]")
public class KonnektorHostnameDTO {

  @JsonProperty("hostName")
  private String hostName;

  public KonnektorHostnameDTO hostName(String hostName) {
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

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    KonnektorHostnameDTO konnektorHostnameDTO = (KonnektorHostnameDTO) o;
    return Objects.equals(this.hostName, konnektorHostnameDTO.hostName);
  }

  @Override
  public int hashCode() {
    return Objects.hash(hostName);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class KonnektorHostnameDTO {\n");
    sb.append("    hostName: ").append(toIndentedString(hostName)).append("\n");
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

