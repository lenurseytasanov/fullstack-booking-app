package com.bookingapp.core.repository;

import com.bookingapp.core.entity.Participant;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ParticipantRepository extends PagingAndSortingRepository<Participant, UUID>, JpaRepository<Participant, UUID> {

    @Query("select p from Participant p join p.meetings m join m.event e where e.id = :eventId")
    List<Participant> findAllParticipantsByEventId(@Param("eventId") UUID eventId, Pageable pageable);

}
