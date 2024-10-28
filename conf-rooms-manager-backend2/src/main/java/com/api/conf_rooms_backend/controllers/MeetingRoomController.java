package com.api.conf_rooms_backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.conf_rooms_backend.models.MeetingRoom;
import com.api.conf_rooms_backend.repositories.MeetingRoomRepository;

@RestController
@RequestMapping("/api/rooms")
public class MeetingRoomController {

	@Autowired
	private MeetingRoomRepository roomRepository;

	// Create a new Meeting Room
	@PostMapping
	public MeetingRoom createRoom(@RequestBody MeetingRoom room) {
		return roomRepository.save(room);
	}

	// Get all Meeting Rooms
	@GetMapping
	public List<MeetingRoom> getAllRooms() {
		return roomRepository.findAll();
	}

	// Get Meeting Room by ID
	@GetMapping("/{id}")
	public ResponseEntity<MeetingRoom> getRoomById(@PathVariable Integer id) {
		Optional<MeetingRoom> room = roomRepository.findById(id);
		return room.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
	}

	// Update Meeting Room
	@PutMapping("/{id}")
	public ResponseEntity<MeetingRoom> updateRoom(@PathVariable Integer id, @RequestBody MeetingRoom roomDetails) {
		Optional<MeetingRoom> room = roomRepository.findById(id);
		if (room.isPresent()) {
			MeetingRoom existingRoom = room.get();
			existingRoom.setName(roomDetails.getName());
			existingRoom.setCapacity(roomDetails.getCapacity());
			existingRoom.setAvailability(roomDetails.isAvailability());
			existingRoom.setUrl(roomDetails.getUrl());
			return ResponseEntity.ok(roomRepository.save(existingRoom));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	// Delete Meeting Room
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteRoom(@PathVariable Integer id) {
		if (roomRepository.existsById(id)) {
			roomRepository.deleteById(id);
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
}