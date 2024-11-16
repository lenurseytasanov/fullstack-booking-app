package com.bookingapp.core.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Setter
@Getter
@Table(name = "EVENT")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "admin_name")
    private String adminName;

    @Column(name = "admin_email")
    private String adminEmail;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private final Set<FileEntity> fileEntities = new LinkedHashSet<>();

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private final Set<Meeting> meetings = new LinkedHashSet<>();

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private final Set<ParticipantAttribute> participantAttributes = new LinkedHashSet<>();

    public Set<FileEntity> getFileEntities() {
        return Collections.unmodifiableSet(fileEntities);
    }

    public Set<Meeting> getMeetings() {
        return Collections.unmodifiableSet(meetings);
    }

    public Set<ParticipantAttribute> getParticipantAttributes() {
        return Collections.unmodifiableSet(participantAttributes);
    }

    public void addFile(FileEntity fileEntity) {
        fileEntities.add(fileEntity);
        fileEntity.setEvent(this);
    }

    public void addMeeting(Meeting meeting) {
        meetings.add(meeting);
        meeting.setEvent(this);
    }

    public void addParticipantAttribute(ParticipantAttribute participantAttribute) {
        participantAttributes.add(participantAttribute);
        participantAttribute.setEvent(this);
    }

}
