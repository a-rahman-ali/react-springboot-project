package com.api.conf_rooms_backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.conf_rooms_backend.models.Booking;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
	List<Booking> findByRoomId(Integer roomId);
}
