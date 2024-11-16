package com.bookingapp.core.entity;

import com.bookingapp.core.exception.NoAvailablePlacesException;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "MEETING")
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "available_places", nullable = false)
    private Long availablePlaces;

    @Column(name = "starts_at", nullable = false)
    private OffsetDateTime startsAt;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @ManyToMany
    @JoinTable(
            name = "BOOKING",
            joinColumns = @JoinColumn(name = "meeting_id"),
            inverseJoinColumns = @JoinColumn(name = "participant_id")
    )
    private final Set<Participant> participants = new LinkedHashSet<>();

    public Set<Participant> getParticipants() {
        return Collections.unmodifiableSet(participants);
    }

    public synchronized void addParticipant(Participant participant) throws NoAvailablePlacesException {
        if (availablePlaces <= 0) {
            throw new NoAvailablePlacesException("Attempting to add participant to meeting when no places left.");
        }
        participants.add(participant);
        participant.addMeeting(this);
        availablePlaces--;
    }

}
