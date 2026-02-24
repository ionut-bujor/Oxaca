package teamproject.backend.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;
import teamproject.backend.dto.CustomerOrderDTO;
import teamproject.backend.dto.CustomerOrderItemDTO;
import teamproject.backend.model.CustomerOrder;
import teamproject.backend.model.CustomerOrderItem;

/**
 * This Class maps an order and a customerorderitem to their respective DTOs.
 */
@Component
public class OrderMapper {

  /**
   * This converts each order item to a DTO.
   *
   * @param item this is the chosen item.
   * @return the item as a dto.
   */
  public CustomerOrderItemDTO toItemDto(CustomerOrderItem item) {
    CustomerOrderItemDTO dto = new CustomerOrderItemDTO();
    dto.setId(item.getId());
    dto.setMenuItemid(item.getMenuItem().getId());
    dto.setQuantity(item.getQuantity());
    dto.setUnitPrice(item.unitPrice());
    dto.setLinePrice(item.linePrice());
    return dto;
  }

  /**
   * This converts an order to a dto.
   *
   * @param order this is the chosen order.
   * @return the order as a dto.
   */
  public CustomerOrderDTO toDto(CustomerOrder order) {
    CustomerOrderDTO dto = new CustomerOrderDTO();
    dto.setId(order.getId());
    dto.setTableNumber(order.getTableNumber());
    dto.setStatus(order.getStatus());
    dto.setCreatedAt(order.getCreatedAt());

    List<CustomerOrderItemDTO> itemDtos = order.getItems().stream()
        .map(this::toItemDto)
        .collect(Collectors.toList());
    dto.setItems(itemDtos);
    dto.setTotalPrice(order.totalPrice(order.getItems()));
    return dto;
  }
}

