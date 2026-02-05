package teamproject.backend.service;

import org.springframework.stereotype.Component;
import teamproject.backend.dto.CustomerOrderDTO;
import teamproject.backend.dto.CustomerOrderItemDTO;
import teamproject.backend.model.CustomerOrder;
import teamproject.backend.model.CustomerOrderItem;

import java.util.ArrayList;
import java.util.List;

@Component
public class OrderMapper {

    public CustomerOrder toEntity(CustomerOrderDTO dto) {
        CustomerOrder order = new CustomerOrder();
        order.setTableNumber(dto.getTableNumber());
        order.setStatus("PLACED");

        List<CustomerOrderItem> items = new ArrayList<>();
        if (dto.getItems() != null) {
            for (CustomerOrderItemDTO itemDto : dto.getItems()) {
                CustomerOrderItem item = new CustomerOrderItem();
                item.setMenuItemId(itemDto.getMenuItemid());   // ✅ DTO uses getMenuItemid()
                item.setQuantity(itemDto.getQuantity());
                item.setOrder(order);
                items.add(item);
            }
        }

        order.getItems().addAll(items);
        return order;
    }

    public CustomerOrderDTO toDto(CustomerOrder order) {
        CustomerOrderDTO dto = new CustomerOrderDTO();
        dto.setId(order.getId());
        dto.setTableNumber(order.getTableNumber());
        dto.setStatus(order.getStatus());

        List<CustomerOrderItemDTO> itemDtos = new ArrayList<>();
        if (order.getItems() != null) {
            for (CustomerOrderItem item : order.getItems()) {
                CustomerOrderItemDTO itemDto = new CustomerOrderItemDTO();
                itemDto.setMenuItemid(item.getMenuItemId());  // ✅ DTO uses setMenuItemid()
                itemDto.setQuantity(item.getQuantity());
                itemDtos.add(itemDto);
            }
        }
        dto.setItems(itemDtos);

        return dto;
    }
}

