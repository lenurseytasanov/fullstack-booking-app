package com.bookingapp.web.mapper;

import com.bookingapp.core.entity.FileEntity;
import com.bookingapp.web.dto.file.FileDto;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class FileMapper {

    private final ModelMapper modelMapper = new ModelMapper();

    public FileDto toDto(FileEntity entity) {
        return modelMapper.map(entity, FileDto.class);
    }

}
