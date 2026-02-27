package teamproject.backend.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;
import teamproject.backend.dto.CustomerOrderDTO;
import teamproject.backend.dto.MenuItemDTO;
import teamproject.backend.model.CustomerOrder;

/**
 * This Class maps an order and a customerorderitem to their respective DTOs.
 */
@Component
public class OrderMapper {

  private final ServiceMenu serviceMenu;

  public OrderMapper(ServiceMenu serviceMenu) {
    this.serviceMenu = serviceMenu;
  }

  /**
   * This converts an order to a dto.
   *
   * @param order this is the chosen order.
   * @return the order as a dto.
   */
  public CustomerOrderDTO orderToDto(CustomerOrder order) {
    CustomerOrderDTO dto = new CustomerOrderDTO();
    dto.setId(order.getId());
    dto.setTableNumber(order.getTableNumber());
    dto.setStatus(order.getStatus());
    dto.setCreatedAt(order.getCreatedAt());

    List<MenuItemDTO> itemDtos = order.getItems().stream()
        .map(menuItem -> serviceMenu.itemToDto(menuItem))
        .collect(Collectors.toList());
    dto.setItems(itemDtos);
    dto.setTotalPrice(order.totalPrice(order.getItems()));
    return dto;
  }

  public ServiceMenu getServiceMenu() {
    return serviceMenu;
  }
}

