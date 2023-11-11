package ua.ldv.databaseservise.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.ldv.databaseservise.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
