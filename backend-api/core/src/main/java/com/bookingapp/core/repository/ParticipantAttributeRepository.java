package com.bookingapp.core.repository;

import com.bookingapp.core.entity.ParticipantAttribute;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ParticipantAttributeRepository extends JpaRepository<ParticipantAttribute, UUID> {

    List<ParticipantAttribute> findByEvent_Id(UUID id);

}
