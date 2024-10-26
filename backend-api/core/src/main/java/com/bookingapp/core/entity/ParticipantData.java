package com.bookingapp.core.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
public class ParticipantData {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "data_id")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "participant_id", nullable = false)
    private Participant participant;

    @ManyToOne
    @JoinColumn(name = "attribute_id", nullable = false)
    private ParticipantAttribute attribute;

    @Column(name = "value")
    private String value;

}
