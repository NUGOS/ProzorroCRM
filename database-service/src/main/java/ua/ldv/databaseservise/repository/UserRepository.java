package ua.ldv.databaseservise.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.ldv.databaseservise.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
