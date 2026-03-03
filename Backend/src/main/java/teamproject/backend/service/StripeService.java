package teamproject.backend.service;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import teamproject.backend.model.CustomerOrder;
import teamproject.backend.model.MenuItem;
import teamproject.backend.repository.CustomerOrderRepository;

@Service
public class StripeService {
  private final CustomerOrderRepository customerOrders;

  public StripeService(CustomerOrderRepository customerOrders) {
    this.customerOrders = customerOrders;
  }

  public CustomerOrder findCustomerOrder(Long id){
    CustomerOrder customerOrder = customerOrders.findById(id)
        .orElseThrow(() -> new ResponseStatusException(
            HttpStatus.NOT_FOUND, "This order doesn't exist "
        ));
    return customerOrder;
  }
}
