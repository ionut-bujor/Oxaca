package teamproject.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import teamproject.backend.dto.MenuItemDto;
import teamproject.backend.model.Allergens;
import teamproject.backend.model.DietaryTag;
import teamproject.backend.model.ItemGroup;
import teamproject.backend.model.MenuItem;
import teamproject.backend.repository.ItemGroupRepository;
import teamproject.backend.repository.MenuItemRepository;
import teamproject.backend.repository.MenuTypeRepository;
import teamproject.backend.service.ServiceMenu;

public class ServiceMenuTest {
  @Mock
  private MenuItemRepository menuItemRepo;

  @Mock
  private ItemGroupRepository itemGroupRepo;

  @Mock
  private MenuTypeRepository menuTypeRepo;

  @InjectMocks
  private ServiceMenu serviceMenu;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }
  @Test
  void testFetchAvailableItems(){
    ItemGroup mainsGroup = new ItemGroup();
    mainsGroup.setName("starter");
    MenuItem availableItem = new MenuItem();
    availableItem.setId(1L);
    availableItem.setName("Caesar Salad");
    availableItem.setDescription("A salad consisting of iceberg lettuce, caesar dressing and crutouns.");
    availableItem.setPrice(new BigDecimal("10.99"));
    availableItem.setImageURL("randomUrllink"); // test this with actual URL once we have one.
    availableItem.setQuantity(5);
    availableItem.setCalories(450);
    availableItem.setTags(Arrays.asList(DietaryTag.GLUTEN_FREE));
    availableItem.setAllergens(Arrays.asList(Allergens.NUTS));
    availableItem.setItemGroup(mainsGroup);

    MenuItem unavailableItem = new MenuItem();
    unavailableItem.setId(2L);
    unavailableItem.setName("Unavailable item");
    unavailableItem.setQuantity(0);

    //mocking what would happen during production, this returns the 2 items that ive defined above
    when(menuItemRepo.findAll()).thenReturn(Arrays.asList(availableItem, unavailableItem));
    List<MenuItemDto> allAvailableItems = serviceMenu.fetchAllAvailableItems();

    assertEquals(1,allAvailableItems.size(), "Only the items with quantity greater than 0 should be returned");
    MenuItemDto receivedDTO = allAvailableItems.get(0);
    assertEquals(receivedDTO.getId(), availableItem.getId(), "The received and mocked items do not match");
    //dont need to check any other attributes as id is unique across all
  }

}
