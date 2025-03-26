package com.mit.service;

import com.mit.entity.CustomerDetails;

import java.util.List;
import java.util.Optional;

public interface CustomerService {

    List<CustomerDetails> getAllCustomers();

    Optional<CustomerDetails> getCustomerById(Long id);

    CustomerDetails createCustomer(CustomerDetails customer);

    CustomerDetails updateCustomer(Long id, CustomerDetails newCustomer);

    void deleteCustomer(Long id);
}