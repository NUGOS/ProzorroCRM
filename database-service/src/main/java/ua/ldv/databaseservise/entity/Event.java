package ua.ldv.databaseservise.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
@Entity
public class Event {
    @Id
    @GeneratedValue
    private Long id;

    private String title;

    private String description;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String location;
}
