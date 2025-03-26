package com.mit.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mit.entity.CustomerIdentityProof;

public interface CustomerIdentityProofRepository extends JpaRepository<CustomerIdentityProof, Long> {
	
}