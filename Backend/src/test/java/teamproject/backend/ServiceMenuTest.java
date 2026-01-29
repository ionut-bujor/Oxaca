package teamproject.backend;

import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import teamproject.backend.Repository.ItemGroupRepository;
import teamproject.backend.Repository.MenuItemRepository;
import teamproject.backend.Repository.MenuTypeRepository;
import teamproject.backend.Service.ServiceMenu;

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


}
