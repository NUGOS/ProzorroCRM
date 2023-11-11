package ua.ldv.databaseservise.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.ldv.databaseservise.entity.Event;
@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Event findAllById(Long id);
}
