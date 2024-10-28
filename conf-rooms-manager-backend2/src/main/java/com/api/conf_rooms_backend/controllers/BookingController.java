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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.api.conf_rooms_backend.models.Booking;
import com.api.conf_rooms_backend.repositories.BookingRepository;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

	@Autowired
	private BookingRepository bookingRepository;

	// Create a new Booking
	@PostMapping
	public Booking createBooking(@RequestBody Booking booking) {
		System.out.println(booking);
		return bookingRepository.save(booking);
	}

	// Get all Bookings
	@GetMapping
	public List<Booking> getAllBookings() {
		return bookingRepository.findAll();
	}

	// Get Booking by ID
	@GetMapping("/{id}")
	public ResponseEntity<Booking> getBookingById(@PathVariable Integer id) {
		Optional<Booking> booking = bookingRepository.findById(id);
		return booking.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
	}

	// Get Bookings by Room ID
	@GetMapping("/room")
	public ResponseEntity<List<Booking>> getBookingsByRoomId(@RequestParam(required = false) Integer room_id) {
		List<Booking> bookings;
		if (room_id != null) {
			bookings = bookingRepository.findByRoomId(room_id);
		} else {
			bookings = bookingRepository.findAll();
		}
		return ResponseEntity.ok(bookings);
	}

	// Update Booking
	@PutMapping("/{id}")
	public ResponseEntity<Booking> updateBooking(@PathVariable Integer id, @RequestBody Booking bookingDetails) {
		Optional<Booking> booking = bookingRepository.findById(id);
		if (booking.isPresent()) {
			Booking existingBooking = booking.get();
			existingBooking.setStartTime(bookingDetails.getStartTime());
			existingBooking.setEndTime(bookingDetails.getEndTime());
			existingBooking.setNumPeople(bookingDetails.getNumPeople());
			existingBooking.setUserId(bookingDetails.getUserId());
			existingBooking.setRoomId(bookingDetails.getRoomId());
			return ResponseEntity.ok(bookingRepository.save(existingBooking));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	// Delete Booking
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteBooking(@PathVariable Integer id) {
		if (bookingRepository.existsById(id)) {
			bookingRepository.deleteById(id);
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
}