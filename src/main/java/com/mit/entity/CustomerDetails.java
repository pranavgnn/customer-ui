package com.mit.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class CustomerDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String gender;

	private String language;

	@OneToOne(cascade = CascadeType.ALL)
	private CustomerName name;

	private LocalDate dateOfBirth;

	@OneToMany(cascade = CascadeType.ALL)
	private List<CustomerContactDetails> contactDetails;

	@OneToOne(cascade = CascadeType.ALL)
	private CustomerAddress address;

	@OneToMany(cascade = CascadeType.ALL)
	private List<CustomerIdentityProof> identityProofs;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public CustomerName getName() {
		return name;
	}

	public void setName(CustomerName name) {
		this.name = name;
	}
	
	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public List<CustomerContactDetails> getContactDetails() {
		return contactDetails;
	}

	public void setContactDetails(List<CustomerContactDetails> contactDetails) {
		this.contactDetails = contactDetails;
	}

	public CustomerAddress getAddress() {
		return address;
	}

	public void setAddress(CustomerAddress address) {
		this.address = address;
	}

	public List<CustomerIdentityProof> getIdentityProofs() {
		return identityProofs;
	}

	public void setIdentityProofs(List<CustomerIdentityProof> identityProofs) {
		this.identityProofs = identityProofs;
	}
}