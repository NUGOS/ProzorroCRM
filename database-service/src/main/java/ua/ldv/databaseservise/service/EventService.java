package ua.ldv.databaseservise.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.ldv.databaseservise.entity.Event;
import ua.ldv.databaseservise.repository.EventRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {
    @Autowired
    EventRepository eventRepository;


    public List<Event> findAllEvents() {
       return eventRepository.findAll();
    }

    public Event findEventById(Long id) {
        return eventRepository.findById(id).orElse(null);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event event) {
        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}
