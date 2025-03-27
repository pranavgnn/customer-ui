package com.mit.service.impl;

import com.mit.service.CustomerService;
import com.mit.entity.CustomerDetails;
import com.mit.repository.CustomerDetailsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerDetailsRepository customerDetailsRepository;

	@Override
	public List<CustomerDetails> getAllCustomers() {
		return customerDetailsRepository.findAll();
	}

	@Override
	public Page<CustomerDetails> getAllCustomersPaginated(Pageable pageable) {
		return customerDetailsRepository.findAll(pageable);
	}

	@Override
	public Optional<CustomerDetails> getCustomerById(Long id) {
		return customerDetailsRepository.findById(id);
	}

	@Override
	public CustomerDetails createCustomer(CustomerDetails customerDetails) {
		return customerDetailsRepository.save(customerDetails);
	}

	@Override
	public CustomerDetails updateCustomer(Long id, CustomerDetails newCustomerDetails) {
		return customerDetailsRepository.findById(id).map(customerDetails -> {
			customerDetails.setGender(newCustomerDetails.getGender());
			customerDetails.setLanguage(newCustomerDetails.getLanguage());
			customerDetails.setName(newCustomerDetails.getName());
			customerDetails.setDateOfBirth(newCustomerDetails.getDateOfBirth());
			customerDetails.setContactDetails(newCustomerDetails.getContactDetails());
			customerDetails.setAddress(newCustomerDetails.getAddress());
			customerDetails.setIdentityProofs(newCustomerDetails.getIdentityProofs());
			return customerDetailsRepository.save(customerDetails);
		}).orElseThrow(() -> new RuntimeException("Customer details not found with id: " + id));
	}

	@Override
	public void deleteCustomer(Long id) {
		customerDetailsRepository.findById(id).ifPresentOrElse(
				customerDetailsRepository::delete,
				() -> {
					throw new RuntimeException("Customer details not found with id: " + id);
				});
	}
}
