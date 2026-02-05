package teamproject.backend.service;

import org.junit.jupiter.api.Test;
import teamproject.backend.dto.CustomerOrderDTO;
import teamproject.backend.dto.CustomerOrderItemDTO;
import teamproject.backend.model.CustomerOrder;
import teamproject.backend.repository.CustomerOrderRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class OrderServiceTest {

    @Test
    void createOrder_validRequest_savesOrderAndReturnsDTO() {
        // Arrange
        CustomerOrderRepository repo = mock(CustomerOrderRepository.class);
        OrderMapper mapper = new OrderMapper();
        OrderService service = new OrderService(repo, mapper);

        CustomerOrderItemDTO item = new CustomerOrderItemDTO();
        item.setMenuItemid(1L);
        item.setQuantity(2);

        CustomerOrderDTO request = new CustomerOrderDTO();
        request.setTableNumber(5);
        request.setItems(List.of(item));

        when(repo.save(any(CustomerOrder.class))).thenAnswer(inv -> {
            CustomerOrder order = inv.getArgument(0);
            order.setStatus("PLACED");
            return order;
        });

        // Act
        CustomerOrderDTO response = service.createOrder(request);

        // Assert
        verify(repo, times(1)).save(any(CustomerOrder.class));
        assertNotNull(response);
        assertEquals("PLACED", response.getStatus());
    }

    @Test
    void createOrder_emptyItems_throwsException() {
        CustomerOrderRepository repo = mock(CustomerOrderRepository.class);
        OrderMapper mapper = new OrderMapper();
        OrderService service = new OrderService(repo, mapper);

        CustomerOrderDTO request = new CustomerOrderDTO();
        request.setItems(List.of());

        assertThrows(IllegalArgumentException.class, () -> service.createOrder(request));
        verify(repo, never()).save(any());
    }
}
