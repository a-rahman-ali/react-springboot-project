package com.api.conf_rooms_backend.controllers;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.conf_rooms_backend.dto.LoginRequest;
import com.api.conf_rooms_backend.models.User;
import com.api.conf_rooms_backend.repositories.UserRepository;
import com.api.conf_rooms_backend.services.CustomUserDetailsService;
import com.api.conf_rooms_backend.utils.JwtUtil;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private CustomUserDetailsService userDetailsService;

	@Autowired
	private JwtUtil jwtUtil;

	// Login functionality with JWT authentication
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		} catch (AuthenticationException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(Collections.singletonMap("error", "Invalid username or password"));
		}

		final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
		final String jwt = jwtUtil.generateToken(userDetails);

		// Find the user in the database using the username
		Optional<User> optionalUser = userRepository.findByUsername(userDetails.getUsername());
//		System.out.println(optionalUser);

		// Check if the user is present
		if (optionalUser.isPresent()) {
			User user = optionalUser.get();

			// Return JWT token along with the username and role
//			System.out.println(jwt);
			return ResponseEntity.ok(Map.of("jwt", jwt, "username", user.getUsername(), "role", user.getRole()));
		} else {
			// If user not found, return a not found response
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(Collections.singletonMap("error", "User not found"));
		}

	}

	// Create a new User
	@PostMapping
	public User createUser(@RequestBody User user) {
		return userRepository.save(user);
	}

	// Get all Users
	@GetMapping
	public List<User> getAllUsers() {
		List<User> allUsers = userRepository.findAll();
		System.out.println(allUsers);
		return userRepository.findAll();
	}

	// Get User by ID
	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Integer id) {
		Optional<User> user = userRepository.findById(id);
		return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
	}

	// Update User
	@PutMapping("/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User userDetails) {
		Optional<User> user = userRepository.findById(id);
		if (user.isPresent()) {
			User existingUser = user.get();
			existingUser.setUsername(userDetails.getUsername());
			existingUser.setPassword(userDetails.getPassword());
			existingUser.setRole(userDetails.getRole());
			return ResponseEntity.ok(userRepository.save(existingUser));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	// Delete User
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
		if (userRepository.existsById(id)) {
			System.out.println("DEBUG" + id);
			userRepository.deleteById(id);
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
}
