package com.bookingapp.core.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "PARTICIPANT")
public class Participant {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToMany(mappedBy = "participant", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private final Set<ParticipantAttributeData> participantAttributes = new LinkedHashSet<>();

    @ManyToMany(mappedBy = "participants", fetch = FetchType.EAGER)
    private final Set<Meeting> meetings = new LinkedHashSet<>();

    public void addMeeting(Meeting meeting) {
        meetings.add(meeting);
    }

    public Set<Meeting> getMeetings() {
        return Collections.unmodifiableSet(meetings);
    }

    public Set<ParticipantAttributeData> getParticipantAttributes() {
        return Collections.unmodifiableSet(participantAttributes);
    }

    public void addAttribute(ParticipantAttributeData participantAttributeData) {
        participantAttributes.add(participantAttributeData);
        participantAttributeData.setParticipant(this);
    }

}
