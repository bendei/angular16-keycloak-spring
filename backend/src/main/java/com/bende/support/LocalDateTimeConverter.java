package com.bende.support;

import org.apache.commons.lang3.StringUtils;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Converter
public class LocalDateTimeConverter implements AttributeConverter<LocalDateTime, String> {

    private static final String DATE_TIME_FORMAT_MISSING_MILLISECONDS = "yyyy-MM-dd HH:mm:ss";
    private static final String DATE_TIME_FORMAT_MISSING_ONE_MILLISECOND = "yyyy-MM-dd HH:mm:ss.S";
    private static final String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss.SS";
    private final DateTimeFormatter format = DateTimeFormatter.ofPattern(DATE_TIME_FORMAT);

    @Override
    public String convertToDatabaseColumn(LocalDateTime dateTime) {
        if (dateTime == null) {
            return null;
        }
        return dateTime.format(format);
    }

    @Override
    public LocalDateTime convertToEntityAttribute(String dateTime) {
        if (StringUtils.isBlank(dateTime)) {
            return null;
        }
        return LocalDateTime.from(format.parse(streamlineMilliseconds(dateTime)));
    }

    // This is necessary since we have legacy data in the db
    private String streamlineMilliseconds(String dateTime) {
        if(dateTime.length() == DATE_TIME_FORMAT_MISSING_MILLISECONDS.length()) {
            return String.format("%s.00", dateTime);
        } else if(dateTime.length() == DATE_TIME_FORMAT_MISSING_ONE_MILLISECOND.length()) {
            return String.format("%s0", dateTime);
        }
        return dateTime.substring(0, DATE_TIME_FORMAT.length());
    }
}
