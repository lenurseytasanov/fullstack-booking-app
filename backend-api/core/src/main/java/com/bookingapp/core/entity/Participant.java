package com.bookingapp.core.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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

}
