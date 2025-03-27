package com.mit.controller;

import com.mit.entity.CustomerDetails;
import com.mit.service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

	@Autowired
	private CustomerService customerService;

	@GetMapping
	public ResponseEntity<Page<CustomerDetails>> getAllCustomersPaginated(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size,
			@RequestParam(defaultValue = "id,asc") String[] sort) {

		List<Sort.Order> orders = new ArrayList<>();

		if (sort[0].contains(",")) {
			// sort=[field,direction]
			for (String sortOrder : sort) {
				String[] _sort = sortOrder.split(",");
				orders.add(new Sort.Order(
						_sort[1].equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC,
						_sort[0]));
			}
		} else {
			// sort=[field,field,...]
			orders.add(new Sort.Order(Sort.Direction.ASC, sort[0]));
		}

		Pageable pageable = PageRequest.of(page, size, Sort.by(orders));

		return ResponseEntity.ok(customerService.getAllCustomersPaginated(pageable));
	}

	@GetMapping("/{id}")
	public ResponseEntity<CustomerDetails> getCustomerById(@PathVariable Long id) {
		return customerService.getCustomerById(id)
				.map(item -> new ResponseEntity<>(item, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@PostMapping
	public ResponseEntity<CustomerDetails> createCustomer(@RequestBody CustomerDetails newCustomerDetails) {
		CustomerDetails savedCustomerDetails = customerService.createCustomer(newCustomerDetails);
		return new ResponseEntity<>(savedCustomerDetails, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public ResponseEntity<CustomerDetails> updateCustomer(@PathVariable Long id,
			@RequestBody CustomerDetails newCustomerDetails) {
		try {
			CustomerDetails updatedCustomerDetails = customerService.updateCustomer(id, newCustomerDetails);
			return new ResponseEntity<>(updatedCustomerDetails, HttpStatus.OK);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
		try {
			customerService.deleteCustomer(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}