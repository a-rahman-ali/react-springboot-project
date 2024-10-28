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

import com.api.conf_rooms_backend.models.PendingBooking;
import com.api.conf_rooms_backend.repositories.PendingBookingRepository;

@RestController
@RequestMapping("/api/pending-bookings")
public class PendingBookingController {

	@Autowired
	private PendingBookingRepository pendingBookingRepository;

	// Create a new Pending Booking
	@PostMapping
	public PendingBooking createPendingBooking(@RequestBody PendingBooking pendingBooking) {
		System.out.println(pendingBooking);
		return pendingBookingRepository.save(pendingBooking);
	}

	// Get all Pending Bookings
	@GetMapping
	public List<PendingBooking> getAllPendingBookings() {
		return pendingBookingRepository.findAll();
	}

	// Get Pending Booking by ID
	@GetMapping("/{id}")
	public ResponseEntity<PendingBooking> getPendingBookingById(@PathVariable Integer id) {
		Optional<PendingBooking> pendingBooking = pendingBookingRepository.findById(id);
		return pendingBooking.map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
	}

	// Update Pending Booking
	@PutMapping("/{id}")
	public ResponseEntity<PendingBooking> updatePendingBooking(@PathVariable Integer id,
			@RequestBody PendingBooking pendingBookingDetails) {
		Optional<PendingBooking> pendingBooking = pendingBookingRepository.findById(id);
		if (pendingBooking.isPresent()) {
			PendingBooking existingPendingBooking = pendingBooking.get();
			existingPendingBooking.setStartTime(pendingBookingDetails.getStartTime());
			existingPendingBooking.setEndTime(pendingBookingDetails.getEndTime());
			existingPendingBooking.setNumPeople(pendingBookingDetails.getNumPeople());
			existingPendingBooking.setUserId(pendingBookingDetails.getUserId());
			existingPendingBooking.setRoomId(pendingBookingDetails.getRoomId());
			return ResponseEntity.ok(pendingBookingRepository.save(existingPendingBooking));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	// Delete Pending Booking
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletePendingBooking(@PathVariable Integer id) {
		if (pendingBookingRepository.existsById(id)) {
			pendingBookingRepository.deleteById(id);
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
}