package com.api.conf_rooms_backend.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "pending_bookings")
public class PendingBooking {
	@Id
	@Column(name = "pending_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Column(name = "start_time")
	private LocalDateTime startTime;

	@Column(name = "end_time")
	private LocalDateTime endTime;

	@Column(name = "num_people")
	private int numPeople;

	@Column(name = "user_id")
	private Integer user_id;

	@Column(name = "room_id")
	private Integer room_id;

	public PendingBooking() {
		super();
	}

	public PendingBooking(Integer id, LocalDateTime startTime, LocalDateTime endTime, int numPeople, Integer user_id,
			Integer room_id) {
		super();
		this.id = id;
		this.startTime = startTime;
		this.endTime = endTime;
		this.numPeople = numPeople;
		this.user_id = user_id;
		this.room_id = room_id;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public LocalDateTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalDateTime startTime) {
		this.startTime = startTime;
	}

	public LocalDateTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalDateTime endTime) {
		this.endTime = endTime;
	}

	public int getNumPeople() {
		return numPeople;
	}

	public void setNumPeople(int numPeople) {
		this.numPeople = numPeople;
	}

	public Integer getUserId() {
		return user_id;
	}

	public void setUserId(Integer user_id) {
		this.user_id = user_id;
	}

	public Integer getRoomId() {
		return room_id;
	}

	public void setRoomId(Integer room_id) {
		this.room_id = room_id;
	}

	@Override
	public String toString() {
		return "PendingBooking [id=" + id + ", numPeople=" + numPeople + ", user=" + user_id + ", room=" + room_id
				+ "]";
	}

}
