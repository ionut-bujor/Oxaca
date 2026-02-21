package teamproject.backend.service;

import java.util.List;
import org.springframework.stereotype.Component;
import teamproject.backend.dto.CustomerOrderDTO;
import teamproject.backend.dto.MenuItemDTO;
import teamproject.backend.model.CustomerOrder;
import teamproject.backend.model.MenuItem;

/**
 * This Class maps an order and a customerorderitem to their respective DTOs.
 */
@Component
public class OrderMapper {

  /**
   * Maps from a MenuItem entity to a DTO formatted for the frontend.
   *
   * @return - The MenuItem DTO.
   */
  public MenuItemDTO itemToDto(MenuItem menuItem) {
    MenuItemDTO dto = new MenuItemDTO();
    dto.setId(menuItem.getId());
    dto.setTitle(menuItem.getName());
    dto.setDesc(menuItem.getDescription());
    dto.setQuantity(menuItem.getQuantity());
    dto.setPrice_usd(menuItem.getPrice());
    dto.setImg(menuItem.getImageUrl());
    dto.setKcal(menuItem.getCalories());
    dto.setAllergen_list(menuItem.getAllergens());
    dto.setDietary_flags(menuItem.getTags());
    dto.setCat(menuItem.getItemGroup().getName());

    return dto;
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
        .map(this::itemToDto)
        .toList();
    dto.setItems(itemDtos);
    dto.setTotalPrice(order.totalPrice(order.getItems()));
    return dto;
  }
}

