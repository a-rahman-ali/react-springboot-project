package com.api.conf_rooms_backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "meeting_rooms")
public class MeetingRoom {
	@Id
	@Column(name = "room_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Column(name = "name")
	private String name;

	@Column(name = "capacity")
	private int capacity;

	@Column(name = "availability")
	private boolean availability;

	@Column(name = "url")
	private String url;

	public MeetingRoom() {
		super();
	}

	public MeetingRoom(Integer id, String name, int capacity, boolean availability, String url) {
		super();
		this.id = id;
		this.name = name;
		this.capacity = capacity;
		this.availability = availability;
		this.url = url;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getCapacity() {
		return capacity;
	}

	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}

	public boolean isAvailability() {
		return availability;
	}

	public void setAvailability(boolean availability) {
		this.availability = availability;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Override
	public String toString() {
		return "MeetingRoom [id=" + id + ", name=" + name + ", capacity=" + capacity + ", availability=" + availability
				+ ", url=" + url + "]";
	}

}
