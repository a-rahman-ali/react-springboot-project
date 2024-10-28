package com.api.conf_rooms_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.conf_rooms_backend.models.PendingBooking;

public interface PendingBookingRepository extends JpaRepository<PendingBooking, Integer> {
}
