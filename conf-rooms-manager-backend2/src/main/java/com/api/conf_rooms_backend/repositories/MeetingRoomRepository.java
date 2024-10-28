package com.api.conf_rooms_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.conf_rooms_backend.models.MeetingRoom;

public interface MeetingRoomRepository extends JpaRepository<MeetingRoom, Integer> {
}
