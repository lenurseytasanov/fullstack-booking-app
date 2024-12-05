package com.bookingapp.core.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "PARTICIPANT_ATTRIBUTE_VALUE")
public class ParticipantAttributeData {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "participant_id", nullable = false)
    private Participant participant;

    @ManyToOne
    @JoinColumn(name = "attribute_id", nullable = false)
    private ParticipantAttribute attribute;

    @Column(name = "value", nullable = false)
    private String value;

}
