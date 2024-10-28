package com.api.conf_rooms_backend.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "history")
public class History {
	@Id
	@Column(name = "history_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer history_id;

	@Column(name = "start_time")
	private LocalDateTime startTime;

	@Column(name = "end_time")
	private LocalDateTime endTime;

	@Column(name = "num_people")
	private int numPeople;

	@Column(name = "status")
	private String status;

	@Column(name = "user_id")
	private Integer user_id;

	@Column(name = "room_id")
	private Integer room_id;

	public History() {
		super();
		// TODO Auto-generated constructor stub
	}

	public History(Integer id, LocalDateTime startTime, LocalDateTime endTime, int numPeople, String status,
			Integer user_id, Integer room_id) {
		super();
		this.history_id = id;
		this.startTime = startTime;
		this.endTime = endTime;
		this.numPeople = numPeople;
		this.status = status;
		this.user_id = user_id;
		this.room_id = room_id;
	}

	public Integer getId() {
		return history_id;
	}

	public void setId(Integer id) {
		this.history_id = id;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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
		return "History [id=" + history_id + ", startTime=" + startTime + ", endTime=" + endTime + ", numPeople="
				+ numPeople + ", status= " + status + ", user=" + user_id + ", room=" + room_id + "]";
	}

}
