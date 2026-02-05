package teamproject.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.dto.CustomerOrderDTO;
import teamproject.backend.dto.CustomerOrderItemDTO;
import teamproject.backend.model.CustomerOrder;
import teamproject.backend.repository.CustomerOrderRepository;

@Service
public class OrderService {

    private final CustomerOrderRepository repo;
    private final OrderMapper mapper;

    public OrderService(CustomerOrderRepository repo, OrderMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @Transactional
    public CustomerOrderDTO createOrder(CustomerOrderDTO request) {
        if (request == null || request.getItems() == null || request.getItems().isEmpty()) {
            throw new IllegalArgumentException("Order must contain at least one item");
        }

        for (CustomerOrderItemDTO item : request.getItems()) {
            if (item.getMenuItemid() == null) { // ✅ DTO uses getMenuItemid()
                throw new IllegalArgumentException("menuItemid required");
            }
            if (item.getQuantity() <= 0) {
                throw new IllegalArgumentException("quantity must be > 0");
            }
        }

        CustomerOrder order = mapper.toEntity(request);
        CustomerOrder saved = repo.save(order);
        return mapper.toDto(saved);
    }
}
