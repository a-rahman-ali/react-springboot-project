package com.api.conf_rooms_backend.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "bookings")
public class Booking {
	@Id
	@Column(name = "booking_id")
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
	private Integer roomId;

	public Booking() {
		super();
	}

	public Booking(Integer id, LocalDateTime startTime, LocalDateTime endTime, int numPeople, Integer user_id,
			Integer roomId) {
		super();
		this.id = id;
		this.startTime = startTime;
		this.endTime = endTime;
		this.numPeople = numPeople;
		this.user_id = user_id;
		this.roomId = roomId;
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
		return roomId;
	}

	public void setRoomId(Integer room_id) {
		this.roomId = room_id;
	}

	@Override
	public String toString() {
		return "Booking [id=" + id + ", startTime=" + startTime + ", endTime=" + endTime + ", numPeople=" + numPeople
				+ ", user=" + user_id + ", room=" + roomId + "]";
	}

}
