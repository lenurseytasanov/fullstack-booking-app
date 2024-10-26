package com.bookingapp.core.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
public class ParticipantAttribute {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "required", nullable = false)
    private Boolean required;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

}
