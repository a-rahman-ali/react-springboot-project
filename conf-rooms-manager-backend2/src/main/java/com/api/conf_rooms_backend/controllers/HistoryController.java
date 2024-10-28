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

import com.api.conf_rooms_backend.models.History;
import com.api.conf_rooms_backend.repositories.HistoryRepository;

@RestController
@RequestMapping("/api/history")
public class HistoryController {

	@Autowired
	private HistoryRepository historyRepository;

	// Create a new History record
	@PostMapping
	public History createHistory(@RequestBody History history) {
		return historyRepository.save(history);
	}

	// Get all History records
	@GetMapping
	public List<History> getAllHistory() {
		return historyRepository.findAll();
	}

	// Get History record by ID
	@GetMapping("/{id}")
	public ResponseEntity<History> getHistoryById(@PathVariable Integer id) {
		Optional<History> history = historyRepository.findById(id);
		return history.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
	}

	// Update History record
	@PutMapping("/{id}")
	public ResponseEntity<History> updateHistory(@PathVariable Integer id, @RequestBody History historyDetails) {
		Optional<History> history = historyRepository.findById(id);
		if (history.isPresent()) {
			History existingHistory = history.get();
			existingHistory.setStartTime(historyDetails.getStartTime());
			existingHistory.setEndTime(historyDetails.getEndTime());
			existingHistory.setNumPeople(historyDetails.getNumPeople());
			existingHistory.setStatus(historyDetails.getStatus());
			existingHistory.setUserId(historyDetails.getUserId());
			existingHistory.setRoomId(historyDetails.getRoomId());
			return ResponseEntity.ok(historyRepository.save(existingHistory));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	// Delete History record
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteHistory(@PathVariable Integer id) {
		if (historyRepository.existsById(id)) {
			historyRepository.deleteById(id);
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
}
