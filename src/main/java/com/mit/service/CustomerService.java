package com.mit.service;

import com.mit.entity.CustomerDetails;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface CustomerService {
    List<CustomerDetails> getAllCustomers();

    // New method for pagination
    Page<CustomerDetails> getAllCustomersPaginated(Pageable pageable);

    Optional<CustomerDetails> getCustomerById(Long id);

    CustomerDetails createCustomer(CustomerDetails customerDetails);

    CustomerDetails updateCustomer(Long id, CustomerDetails customerDetails);

    void deleteCustomer(Long id);
}