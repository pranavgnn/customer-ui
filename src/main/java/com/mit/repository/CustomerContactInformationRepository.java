package com.mit.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mit.entity.CustomerContactDetails;

public interface CustomerContactInformationRepository extends JpaRepository<CustomerContactDetails, Long> {
	
}