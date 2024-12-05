package com.bookingapp.core.repository;

import com.bookingapp.core.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MeetingRepository extends JpaRepository<Meeting, UUID> {

}
